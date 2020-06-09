"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorGroupIterator = exports.CHUNK_SIZE = void 0;

var _fetch_chunk = require("./fetch_chunk");

var _types = require("../../../../../../legacy/plugins/uptime/common/graphql/types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Hardcoded chunk size for how many monitors to fetch at a time when querying
const CHUNK_SIZE = 1000; // Function that fetches a chunk of data used in iteration

exports.CHUNK_SIZE = CHUNK_SIZE;

/**
 * This class exists to simplify the process of querying for page data. Because the raw queries responsible for fetching pages
 * pull data in `chunks`, and those chunks can be full of matches or void of results that would require additional
 * querying, this class provides a `next` function that is cleaner to call. `next` provides the next matching result,
 * which may require many subsequent fetches, while keeping the external API clean.
 */
// matches, or may simple be empty results that tell us a to keep looking for more, this class exists to simplify things.
// The idea is that you can call next() on it and receive the next matching result, even if internally we need to fetch
// multiple chunks to find that result.
class MonitorGroupIterator {
  // Cache representing pre-fetched query results.
  // The first item is the CheckGroup this represents.
  constructor(queryContext, initialBuffer = [], initialBufferPos = -1, chunkFetcher = _fetch_chunk.fetchChunk) {
    _defineProperty(this, "queryContext", void 0);

    _defineProperty(this, "buffer", void 0);

    _defineProperty(this, "bufferPos", void 0);

    _defineProperty(this, "searchAfter", void 0);

    _defineProperty(this, "chunkFetcher", void 0);

    this.queryContext = queryContext;
    this.buffer = initialBuffer;
    this.bufferPos = initialBufferPos;
    this.searchAfter = queryContext.pagination.cursorKey;
    this.chunkFetcher = chunkFetcher;
  } // Fetch the next matching result.


  async next() {
    await this.bufferNext(CHUNK_SIZE);
    const found = this.buffer[this.bufferPos + 1];

    if (found) {
      this.bufferPos++;
      return found;
    }

    return null;
  } // Look ahead to see if there are additional results.


  async peek() {
    await this.bufferNext(CHUNK_SIZE);
    return this.buffer[this.bufferPos + 1] || null;
  } // Returns the last item fetched with next(). null if no items fetched with
  // next or if next has not yet been invoked.


  getCurrent() {
    return this.buffer[this.bufferPos] || null;
  } // Attempts to buffer at most `size` number of additional results, stopping when at least one additional
  // result is buffered or there are no more matching items to be found.


  async bufferNext(size = CHUNK_SIZE) {
    // The next element is already buffered.
    if (this.buffer[this.bufferPos + 1]) {
      return;
    }

    while (true) {
      const result = await this.attemptBufferMore(CHUNK_SIZE);

      if (result.gotHit || !result.hasMore) {
        return;
      }
    }
  }
  /**
   *  Attempts to buffer more results fetching a single chunk.
   * If trim is set to true, which is the default, it will delete all items in the buffer prior to the current item.
   * to free up space.
   * @param size the number of items to chunk
   */


  async attemptBufferMore(size = CHUNK_SIZE) {
    // Trim the buffer to just the current element since we'll be fetching more
    const current = this.getCurrent(); // Trim the buffer to free space before fetching more
    // We only need to do this if there is actually something in the buffer.
    // This also behaves correctly in the -1 case for bufferPos, where we don't want to make it 0.

    if (current) {
      this.buffer = [current];
      this.bufferPos = 0;
    }

    const results = await this.chunkFetcher(this.queryContext, this.searchAfter, size); // If we've hit the end of the stream searchAfter will be empty

    results.monitorGroups.forEach(mig => this.buffer.push(mig));

    if (results.searchAfter) {
      this.searchAfter = results.searchAfter;
    }

    return {
      gotHit: results.monitorGroups.length > 0,
      hasMore: !!results.searchAfter
    };
  } // Get a CursorPaginator object that will resume after the current() value.


  async paginationAfterCurrent() {
    const peek = await this.peek();

    if (!peek) {
      return null;
    }

    const current = this.getCurrent();

    if (!current) {
      return null;
    }

    const cursorKey = {
      monitor_id: current.id
    };
    return Object.assign({}, this.queryContext.pagination, {
      cursorKey
    });
  } // Get a CursorPaginator object that will resume before the current() value.


  async paginationBeforeCurrent() {
    const reverseFetcher = await this.reverse();
    return reverseFetcher && (await reverseFetcher.paginationAfterCurrent());
  } // Returns a copy of this fetcher that goes backwards from the current position


  reverse() {
    const reverseContext = this.queryContext.clone();
    const current = this.getCurrent();
    reverseContext.pagination = {
      cursorKey: current ? {
        monitor_id: current.id
      } : null,
      sortOrder: this.queryContext.pagination.sortOrder,
      cursorDirection: this.queryContext.pagination.cursorDirection === _types.CursorDirection.AFTER ? _types.CursorDirection.BEFORE : _types.CursorDirection.AFTER
    };
    return current ? new MonitorGroupIterator(reverseContext, [current], 0, this.chunkFetcher) : null;
  } // Returns a copy of this with a shallow copied buffer. Note that the queryContext is still shared!


  clone() {
    return new MonitorGroupIterator(this.queryContext, this.buffer.slice(0), this.bufferPos);
  }

}

exports.MonitorGroupIterator = MonitorGroupIterator;