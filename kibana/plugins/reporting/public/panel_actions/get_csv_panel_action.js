"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCsvReportPanelAction = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _i18n = require("@kbn/i18n");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _public = require("../../../../../src/plugins/ui_actions/public");

var _license_check = require("../lib/license_check");

var _public2 = require("../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public");

var _constants = require("../../../../../src/legacy/core_plugins/kibana/public/discover/np_ready/embeddable/constants");

var _constants2 = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isSavedSearchEmbeddable(embeddable) {
  return embeddable.type === _constants.SEARCH_EMBEDDABLE_TYPE;
}

var GetCsvReportPanelAction =
/*#__PURE__*/
function () {
  function GetCsvReportPanelAction(core, license$) {
    var _this = this;

    _classCallCheck(this, GetCsvReportPanelAction);

    _defineProperty(this, "isDownloading", void 0);

    _defineProperty(this, "type", '');

    _defineProperty(this, "id", _constants2.CSV_REPORTING_ACTION);

    _defineProperty(this, "canDownloadCSV", false);

    _defineProperty(this, "core", void 0);

    _defineProperty(this, "isCompatible",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(context) {
        var embeddable;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.canDownloadCSV) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                embeddable = context.embeddable;
                return _context.abrupt("return", embeddable.getInput().viewMode !== _public2.ViewMode.EDIT && embeddable.type === 'search');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "execute",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(context) {
        var embeddable, _embeddable$getInput, _embeddable$getInput$, to, from, searchEmbeddable, searchRequestBody, state, kibanaTimezone, id, filename, timezone, fromTime, toTime, body;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                embeddable = context.embeddable;

                if (isSavedSearchEmbeddable(embeddable)) {
                  _context2.next = 3;
                  break;
                }

                throw new _public.IncompatibleActionError();

              case 3:
                if (!_this.isDownloading) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return");

              case 5:
                _embeddable$getInput = embeddable.getInput(), _embeddable$getInput$ = _embeddable$getInput.timeRange, to = _embeddable$getInput$.to, from = _embeddable$getInput$.from;
                searchEmbeddable = embeddable;
                _context2.next = 9;
                return _this.getSearchRequestBody({
                  searchEmbeddable: searchEmbeddable
                });

              case 9:
                searchRequestBody = _context2.sent;
                state = _.pick(searchRequestBody, ['sort', 'docvalue_fields', 'query']);
                kibanaTimezone = _this.core.uiSettings.get('dateFormat:tz');
                id = "search:".concat(embeddable.getSavedSearch().id);
                filename = embeddable.getTitle();
                timezone = kibanaTimezone === 'Browser' ? _momentTimezone.default.tz.guess() : kibanaTimezone;
                fromTime = _datemath.default.parse(from);
                toTime = _datemath.default.parse(to);

                if (!(!fromTime || !toTime)) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return", _this.onGenerationFail(new Error("Invalid time range: From: ".concat(fromTime, ", To: ").concat(toTime))));

              case 19:
                body = JSON.stringify({
                  timerange: {
                    min: fromTime.format(),
                    max: toTime.format(),
                    timezone: timezone
                  },
                  state: state
                });
                _this.isDownloading = true;

                _this.core.notifications.toasts.addSuccess({
                  title: _i18n.i18n.translate('xpack.reporting.dashboard.csvDownloadStartedTitle', {
                    defaultMessage: "CSV Download Started"
                  }),
                  text: _i18n.i18n.translate('xpack.reporting.dashboard.csvDownloadStartedMessage', {
                    defaultMessage: "Your CSV will download momentarily."
                  }),
                  'data-test-subj': 'csvDownloadStarted'
                });

                _context2.next = 24;
                return _this.core.http.post("".concat(_constants2.API_GENERATE_IMMEDIATE, "/").concat(id), {
                  body: body
                }).then(function (rawResponse) {
                  _this.isDownloading = false;
                  var download = "".concat(filename, ".csv");
                  var blob = new Blob([rawResponse], {
                    type: 'text/csv;charset=utf-8;'
                  }); // Hack for IE11 Support

                  if (window.navigator.msSaveOrOpenBlob) {
                    return window.navigator.msSaveOrOpenBlob(blob, download);
                  }

                  var a = window.document.createElement('a');
                  var downloadObject = window.URL.createObjectURL(blob);
                  a.href = downloadObject;
                  a.download = download;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(downloadObject);
                  document.body.removeChild(a);
                }).catch(_this.onGenerationFail.bind(_this));

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    this.isDownloading = false;
    this.core = core;
    license$.subscribe(function (license) {
      var results = license.check('reporting', 'basic');

      var _checkLicense = (0, _license_check.checkLicense)(results),
          showLinks = _checkLicense.showLinks;

      _this.canDownloadCSV = showLinks;
    });
  }

  _createClass(GetCsvReportPanelAction, [{
    key: "getIconType",
    value: function getIconType() {
      return 'document';
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('xpack.reporting.dashboard.downloadCsvPanelTitle', {
        defaultMessage: 'Download CSV'
      });
    }
  }, {
    key: "getSearchRequestBody",
    value: function () {
      var _getSearchRequestBody = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref3) {
        var searchEmbeddable, adapters;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                searchEmbeddable = _ref3.searchEmbeddable;
                adapters = searchEmbeddable.getInspectorAdapters();

                if (adapters) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", {});

              case 4:
                if (!(adapters.requests.requests.length === 0)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", {});

              case 6:
                return _context3.abrupt("return", searchEmbeddable.getSavedSearch().searchSource.getSearchRequestBody());

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getSearchRequestBody(_x3) {
        return _getSearchRequestBody.apply(this, arguments);
      }

      return getSearchRequestBody;
    }()
  }, {
    key: "onGenerationFail",
    value: function onGenerationFail(error) {
      this.isDownloading = false;
      this.core.notifications.toasts.addDanger({
        title: _i18n.i18n.translate('xpack.reporting.dashboard.failedCsvDownloadTitle', {
          defaultMessage: "CSV download failed"
        }),
        text: _i18n.i18n.translate('xpack.reporting.dashboard.failedCsvDownloadMessage', {
          defaultMessage: "We couldn't generate your CSV at this time."
        }),
        'data-test-subj': 'downloadCsvFail'
      });
    }
  }]);

  return GetCsvReportPanelAction;
}();

exports.GetCsvReportPanelAction = GetCsvReportPanelAction;