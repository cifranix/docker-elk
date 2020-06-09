"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMapPath = createMapPath;
exports.SCALING_TYPES = exports.VECTOR_STYLES = exports.DEFAULT_ICON = exports.LABEL_BORDER_SIZES = exports.SYMBOLIZE_AS_TYPES = exports.ORDINAL_DATA_TYPES = exports.CATEGORICAL_DATA_TYPES = exports.COLOR_PALETTE_MAX_SIZE = exports.COLOR_MAP_TYPE = exports.LAYER_STYLE_TYPE = exports.STYLE_TYPE = exports.COUNT_PROP_NAME = exports.COUNT_PROP_LABEL = exports.TOP_TERM_PERCENTAGE_SUFFIX = exports.GRID_RESOLUTION = exports.RENDER_AS = exports.AGG_TYPE = exports.DRAW_TYPE = exports.EMPTY_FEATURE_COLLECTION = exports.LAT_INDEX = exports.LON_INDEX = exports.POLYGON_COORDINATES_EXTERIOR_INDEX = exports.GEO_JSON_TYPE = exports.ES_SPATIAL_RELATIONS = exports.ES_GEO_FIELD_TYPE = exports.MB_SOURCE_ID_LAYER_ID_PREFIX_DELIMITER = exports.FEATURE_VISIBLE_PROPERTY_NAME = exports.FEATURE_ID_PROPERTY_NAME = exports.DEFAULT_MAX_BUCKETS_LIMIT = exports.DEFAULT_MAX_INNER_RESULT_WINDOW = exports.DEFAULT_MAX_RESULT_WINDOW = exports.ZOOM_PRECISION = exports.DECIMAL_DEGREES_PRECISION = exports.MAX_ZOOM = exports.MIN_ZOOM = exports.GEOJSON_FILE = exports.SOURCE_FORMATTERS_ID_ORIGIN = exports.FORMATTERS_ID_ORIGIN_SUFFIX = exports.SOURCE_META_ID_ORIGIN = exports.META_ID_ORIGIN_SUFFIX = exports.SOURCE_DATA_ID_ORIGIN = exports.FIELD_ORIGIN = exports.EMS_XYZ = exports.ES_PEW_PEW = exports.ES_SEARCH = exports.ES_GEO_GRID = exports.EMS_FILE = exports.EMS_TMS = exports.SORT_ORDER = exports.LAYER_TYPE = exports.MAP_BASE_URL = exports.INDEX_SETTINGS_API_PATH = exports.GIS_API_PATH = exports.MAP_APP_PATH = exports.TELEMETRY_TYPE = exports.APP_ICON = exports.APP_ID = exports.MAP_SAVED_OBJECT_TYPE = exports.EMS_TILES_VECTOR_TILE_PATH = exports.EMS_TILES_VECTOR_SOURCE_PATH = exports.EMS_TILES_VECTOR_STYLE_PATH = exports.EMS_TILES_RASTER_TILE_PATH = exports.EMS_TILES_RASTER_STYLE_PATH = exports.EMS_TILES_API_PATH = exports.EMS_TILES_CATALOGUE_PATH = exports.EMS_SPRITES_PATH = exports.EMS_GLYPHS_PATH = exports.EMS_FILES_DEFAULT_JSON_PATH = exports.EMS_FILES_API_PATH = exports.EMS_FILES_CATALOGUE_PATH = exports.EMS_CATALOGUE_PATH = exports.EMS_APP_NAME = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const EMS_APP_NAME = 'kibana';
exports.EMS_APP_NAME = EMS_APP_NAME;
const EMS_CATALOGUE_PATH = 'ems/catalogue';
exports.EMS_CATALOGUE_PATH = EMS_CATALOGUE_PATH;
const EMS_FILES_CATALOGUE_PATH = 'ems/files';
exports.EMS_FILES_CATALOGUE_PATH = EMS_FILES_CATALOGUE_PATH;
const EMS_FILES_API_PATH = 'ems/files';
exports.EMS_FILES_API_PATH = EMS_FILES_API_PATH;
const EMS_FILES_DEFAULT_JSON_PATH = 'file';
exports.EMS_FILES_DEFAULT_JSON_PATH = EMS_FILES_DEFAULT_JSON_PATH;
const EMS_GLYPHS_PATH = 'fonts';
exports.EMS_GLYPHS_PATH = EMS_GLYPHS_PATH;
const EMS_SPRITES_PATH = 'sprites';
exports.EMS_SPRITES_PATH = EMS_SPRITES_PATH;
const EMS_TILES_CATALOGUE_PATH = 'ems/tiles';
exports.EMS_TILES_CATALOGUE_PATH = EMS_TILES_CATALOGUE_PATH;
const EMS_TILES_API_PATH = 'ems/tiles';
exports.EMS_TILES_API_PATH = EMS_TILES_API_PATH;
const EMS_TILES_RASTER_STYLE_PATH = 'raster/style';
exports.EMS_TILES_RASTER_STYLE_PATH = EMS_TILES_RASTER_STYLE_PATH;
const EMS_TILES_RASTER_TILE_PATH = 'raster/tile';
exports.EMS_TILES_RASTER_TILE_PATH = EMS_TILES_RASTER_TILE_PATH;
const EMS_TILES_VECTOR_STYLE_PATH = 'vector/style';
exports.EMS_TILES_VECTOR_STYLE_PATH = EMS_TILES_VECTOR_STYLE_PATH;
const EMS_TILES_VECTOR_SOURCE_PATH = 'vector/source';
exports.EMS_TILES_VECTOR_SOURCE_PATH = EMS_TILES_VECTOR_SOURCE_PATH;
const EMS_TILES_VECTOR_TILE_PATH = 'vector/tile';
exports.EMS_TILES_VECTOR_TILE_PATH = EMS_TILES_VECTOR_TILE_PATH;
const MAP_SAVED_OBJECT_TYPE = 'map';
exports.MAP_SAVED_OBJECT_TYPE = MAP_SAVED_OBJECT_TYPE;
const APP_ID = 'maps';
exports.APP_ID = APP_ID;
const APP_ICON = 'gisApp';
exports.APP_ICON = APP_ICON;
const TELEMETRY_TYPE = 'maps-telemetry';
exports.TELEMETRY_TYPE = TELEMETRY_TYPE;
const MAP_APP_PATH = `app/${APP_ID}`;
exports.MAP_APP_PATH = MAP_APP_PATH;
const GIS_API_PATH = `api/${APP_ID}`;
exports.GIS_API_PATH = GIS_API_PATH;
const INDEX_SETTINGS_API_PATH = `${GIS_API_PATH}/indexSettings`;
exports.INDEX_SETTINGS_API_PATH = INDEX_SETTINGS_API_PATH;
const MAP_BASE_URL = `/${MAP_APP_PATH}#/${MAP_SAVED_OBJECT_TYPE}`;
exports.MAP_BASE_URL = MAP_BASE_URL;

function createMapPath(id) {
  return `${MAP_BASE_URL}/${id}`;
}

let LAYER_TYPE;
exports.LAYER_TYPE = LAYER_TYPE;

(function (LAYER_TYPE) {
  LAYER_TYPE["TILE"] = "TILE";
  LAYER_TYPE["VECTOR"] = "VECTOR";
  LAYER_TYPE["VECTOR_TILE"] = "VECTOR_TILE";
  LAYER_TYPE["HEATMAP"] = "HEATMAP";
  LAYER_TYPE["BLENDED_VECTOR"] = "BLENDED_VECTOR";
})(LAYER_TYPE || (exports.LAYER_TYPE = LAYER_TYPE = {}));

let SORT_ORDER;
exports.SORT_ORDER = SORT_ORDER;

(function (SORT_ORDER) {
  SORT_ORDER["ASC"] = "asc";
  SORT_ORDER["DESC"] = "desc";
})(SORT_ORDER || (exports.SORT_ORDER = SORT_ORDER = {}));

const EMS_TMS = 'EMS_TMS';
exports.EMS_TMS = EMS_TMS;
const EMS_FILE = 'EMS_FILE';
exports.EMS_FILE = EMS_FILE;
const ES_GEO_GRID = 'ES_GEO_GRID';
exports.ES_GEO_GRID = ES_GEO_GRID;
const ES_SEARCH = 'ES_SEARCH';
exports.ES_SEARCH = ES_SEARCH;
const ES_PEW_PEW = 'ES_PEW_PEW';
exports.ES_PEW_PEW = ES_PEW_PEW;
const EMS_XYZ = 'EMS_XYZ'; // identifies a custom TMS source. Name is a little unfortunate.

exports.EMS_XYZ = EMS_XYZ;
let FIELD_ORIGIN;
exports.FIELD_ORIGIN = FIELD_ORIGIN;

(function (FIELD_ORIGIN) {
  FIELD_ORIGIN["SOURCE"] = "source";
  FIELD_ORIGIN["JOIN"] = "join";
})(FIELD_ORIGIN || (exports.FIELD_ORIGIN = FIELD_ORIGIN = {}));

const SOURCE_DATA_ID_ORIGIN = 'source';
exports.SOURCE_DATA_ID_ORIGIN = SOURCE_DATA_ID_ORIGIN;
const META_ID_ORIGIN_SUFFIX = 'meta';
exports.META_ID_ORIGIN_SUFFIX = META_ID_ORIGIN_SUFFIX;
const SOURCE_META_ID_ORIGIN = `${SOURCE_DATA_ID_ORIGIN}_${META_ID_ORIGIN_SUFFIX}`;
exports.SOURCE_META_ID_ORIGIN = SOURCE_META_ID_ORIGIN;
const FORMATTERS_ID_ORIGIN_SUFFIX = 'formatters';
exports.FORMATTERS_ID_ORIGIN_SUFFIX = FORMATTERS_ID_ORIGIN_SUFFIX;
const SOURCE_FORMATTERS_ID_ORIGIN = `${SOURCE_DATA_ID_ORIGIN}_${FORMATTERS_ID_ORIGIN_SUFFIX}`;
exports.SOURCE_FORMATTERS_ID_ORIGIN = SOURCE_FORMATTERS_ID_ORIGIN;
const GEOJSON_FILE = 'GEOJSON_FILE';
exports.GEOJSON_FILE = GEOJSON_FILE;
const MIN_ZOOM = 0;
exports.MIN_ZOOM = MIN_ZOOM;
const MAX_ZOOM = 24;
exports.MAX_ZOOM = MAX_ZOOM;
const DECIMAL_DEGREES_PRECISION = 5; // meters precision

exports.DECIMAL_DEGREES_PRECISION = DECIMAL_DEGREES_PRECISION;
const ZOOM_PRECISION = 2;
exports.ZOOM_PRECISION = ZOOM_PRECISION;
const DEFAULT_MAX_RESULT_WINDOW = 10000;
exports.DEFAULT_MAX_RESULT_WINDOW = DEFAULT_MAX_RESULT_WINDOW;
const DEFAULT_MAX_INNER_RESULT_WINDOW = 100;
exports.DEFAULT_MAX_INNER_RESULT_WINDOW = DEFAULT_MAX_INNER_RESULT_WINDOW;
const DEFAULT_MAX_BUCKETS_LIMIT = 10000;
exports.DEFAULT_MAX_BUCKETS_LIMIT = DEFAULT_MAX_BUCKETS_LIMIT;
const FEATURE_ID_PROPERTY_NAME = '__kbn__feature_id__';
exports.FEATURE_ID_PROPERTY_NAME = FEATURE_ID_PROPERTY_NAME;
const FEATURE_VISIBLE_PROPERTY_NAME = '__kbn_isvisibleduetojoin__';
exports.FEATURE_VISIBLE_PROPERTY_NAME = FEATURE_VISIBLE_PROPERTY_NAME;
const MB_SOURCE_ID_LAYER_ID_PREFIX_DELIMITER = '_';
exports.MB_SOURCE_ID_LAYER_ID_PREFIX_DELIMITER = MB_SOURCE_ID_LAYER_ID_PREFIX_DELIMITER;
const ES_GEO_FIELD_TYPE = {
  GEO_POINT: 'geo_point',
  GEO_SHAPE: 'geo_shape'
};
exports.ES_GEO_FIELD_TYPE = ES_GEO_FIELD_TYPE;
const ES_SPATIAL_RELATIONS = {
  INTERSECTS: 'INTERSECTS',
  DISJOINT: 'DISJOINT',
  WITHIN: 'WITHIN'
};
exports.ES_SPATIAL_RELATIONS = ES_SPATIAL_RELATIONS;
const GEO_JSON_TYPE = {
  POINT: 'Point',
  MULTI_POINT: 'MultiPoint',
  LINE_STRING: 'LineString',
  MULTI_LINE_STRING: 'MultiLineString',
  POLYGON: 'Polygon',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection'
};
exports.GEO_JSON_TYPE = GEO_JSON_TYPE;
const POLYGON_COORDINATES_EXTERIOR_INDEX = 0;
exports.POLYGON_COORDINATES_EXTERIOR_INDEX = POLYGON_COORDINATES_EXTERIOR_INDEX;
const LON_INDEX = 0;
exports.LON_INDEX = LON_INDEX;
const LAT_INDEX = 1;
exports.LAT_INDEX = LAT_INDEX;
const EMPTY_FEATURE_COLLECTION = {
  type: 'FeatureCollection',
  features: []
};
exports.EMPTY_FEATURE_COLLECTION = EMPTY_FEATURE_COLLECTION;
const DRAW_TYPE = {
  BOUNDS: 'BOUNDS',
  DISTANCE: 'DISTANCE',
  POLYGON: 'POLYGON'
};
exports.DRAW_TYPE = DRAW_TYPE;
let AGG_TYPE;
exports.AGG_TYPE = AGG_TYPE;

(function (AGG_TYPE) {
  AGG_TYPE["AVG"] = "avg";
  AGG_TYPE["COUNT"] = "count";
  AGG_TYPE["MAX"] = "max";
  AGG_TYPE["MIN"] = "min";
  AGG_TYPE["SUM"] = "sum";
  AGG_TYPE["TERMS"] = "terms";
  AGG_TYPE["UNIQUE_COUNT"] = "cardinality";
})(AGG_TYPE || (exports.AGG_TYPE = AGG_TYPE = {}));

let RENDER_AS;
exports.RENDER_AS = RENDER_AS;

(function (RENDER_AS) {
  RENDER_AS["HEATMAP"] = "heatmap";
  RENDER_AS["POINT"] = "point";
  RENDER_AS["GRID"] = "grid";
})(RENDER_AS || (exports.RENDER_AS = RENDER_AS = {}));

let GRID_RESOLUTION;
exports.GRID_RESOLUTION = GRID_RESOLUTION;

(function (GRID_RESOLUTION) {
  GRID_RESOLUTION["COARSE"] = "COARSE";
  GRID_RESOLUTION["FINE"] = "FINE";
  GRID_RESOLUTION["MOST_FINE"] = "MOST_FINE";
})(GRID_RESOLUTION || (exports.GRID_RESOLUTION = GRID_RESOLUTION = {}));

const TOP_TERM_PERCENTAGE_SUFFIX = '__percentage';
exports.TOP_TERM_PERCENTAGE_SUFFIX = TOP_TERM_PERCENTAGE_SUFFIX;

const COUNT_PROP_LABEL = _i18n.i18n.translate('xpack.maps.aggs.defaultCountLabel', {
  defaultMessage: 'count'
});

exports.COUNT_PROP_LABEL = COUNT_PROP_LABEL;
const COUNT_PROP_NAME = 'doc_count';
exports.COUNT_PROP_NAME = COUNT_PROP_NAME;
let STYLE_TYPE;
exports.STYLE_TYPE = STYLE_TYPE;

(function (STYLE_TYPE) {
  STYLE_TYPE["STATIC"] = "STATIC";
  STYLE_TYPE["DYNAMIC"] = "DYNAMIC";
})(STYLE_TYPE || (exports.STYLE_TYPE = STYLE_TYPE = {}));

let LAYER_STYLE_TYPE;
exports.LAYER_STYLE_TYPE = LAYER_STYLE_TYPE;

(function (LAYER_STYLE_TYPE) {
  LAYER_STYLE_TYPE["VECTOR"] = "VECTOR";
  LAYER_STYLE_TYPE["HEATMAP"] = "HEATMAP";
})(LAYER_STYLE_TYPE || (exports.LAYER_STYLE_TYPE = LAYER_STYLE_TYPE = {}));

const COLOR_MAP_TYPE = {
  CATEGORICAL: 'CATEGORICAL',
  ORDINAL: 'ORDINAL'
};
exports.COLOR_MAP_TYPE = COLOR_MAP_TYPE;
const COLOR_PALETTE_MAX_SIZE = 10;
exports.COLOR_PALETTE_MAX_SIZE = COLOR_PALETTE_MAX_SIZE;
const CATEGORICAL_DATA_TYPES = ['string', 'ip', 'boolean'];
exports.CATEGORICAL_DATA_TYPES = CATEGORICAL_DATA_TYPES;
const ORDINAL_DATA_TYPES = ['number', 'date'];
exports.ORDINAL_DATA_TYPES = ORDINAL_DATA_TYPES;
let SYMBOLIZE_AS_TYPES;
exports.SYMBOLIZE_AS_TYPES = SYMBOLIZE_AS_TYPES;

(function (SYMBOLIZE_AS_TYPES) {
  SYMBOLIZE_AS_TYPES["CIRCLE"] = "circle";
  SYMBOLIZE_AS_TYPES["ICON"] = "icon";
})(SYMBOLIZE_AS_TYPES || (exports.SYMBOLIZE_AS_TYPES = SYMBOLIZE_AS_TYPES = {}));

let LABEL_BORDER_SIZES;
exports.LABEL_BORDER_SIZES = LABEL_BORDER_SIZES;

(function (LABEL_BORDER_SIZES) {
  LABEL_BORDER_SIZES["NONE"] = "NONE";
  LABEL_BORDER_SIZES["SMALL"] = "SMALL";
  LABEL_BORDER_SIZES["MEDIUM"] = "MEDIUM";
  LABEL_BORDER_SIZES["LARGE"] = "LARGE";
})(LABEL_BORDER_SIZES || (exports.LABEL_BORDER_SIZES = LABEL_BORDER_SIZES = {}));

const DEFAULT_ICON = 'marker';
exports.DEFAULT_ICON = DEFAULT_ICON;
let VECTOR_STYLES;
exports.VECTOR_STYLES = VECTOR_STYLES;

(function (VECTOR_STYLES) {
  VECTOR_STYLES["SYMBOLIZE_AS"] = "symbolizeAs";
  VECTOR_STYLES["FILL_COLOR"] = "fillColor";
  VECTOR_STYLES["LINE_COLOR"] = "lineColor";
  VECTOR_STYLES["LINE_WIDTH"] = "lineWidth";
  VECTOR_STYLES["ICON"] = "icon";
  VECTOR_STYLES["ICON_SIZE"] = "iconSize";
  VECTOR_STYLES["ICON_ORIENTATION"] = "iconOrientation";
  VECTOR_STYLES["LABEL_TEXT"] = "labelText";
  VECTOR_STYLES["LABEL_COLOR"] = "labelColor";
  VECTOR_STYLES["LABEL_SIZE"] = "labelSize";
  VECTOR_STYLES["LABEL_BORDER_COLOR"] = "labelBorderColor";
  VECTOR_STYLES["LABEL_BORDER_SIZE"] = "labelBorderSize";
})(VECTOR_STYLES || (exports.VECTOR_STYLES = VECTOR_STYLES = {}));

let SCALING_TYPES;
exports.SCALING_TYPES = SCALING_TYPES;

(function (SCALING_TYPES) {
  SCALING_TYPES["LIMIT"] = "LIMIT";
  SCALING_TYPES["CLUSTERS"] = "CLUSTERS";
  SCALING_TYPES["TOP_HITS"] = "TOP_HITS";
})(SCALING_TYPES || (exports.SCALING_TYPES = SCALING_TYPES = {}));