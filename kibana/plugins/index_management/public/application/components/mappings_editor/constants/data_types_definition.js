"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALL_DATA_TYPES = exports.SUB_TYPE_MAP_TO_MAIN = exports.MAIN_DATA_TYPE_DEFINITION = exports.MAIN_TYPES = exports.TYPE_DEFINITION = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TYPE_DEFINITION = {
  text: {
    value: 'text',
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.textDescription', {
      defaultMessage: 'Text'
    }),
    documentation: {
      main: '/text.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.textLongDescription",
        defaultMessage: "Text fields support full-text search by breaking strings into individual, searchable terms. To index structured content, such as an email address, use the {keyword}.",
        values: {
          keyword: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getTypeDocLink('keyword'),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.textLongDescription.keywordTypeLink', {
            defaultMessage: 'keyword data type'
          }))
        }
      }));
    }
  },
  keyword: {
    value: 'keyword',
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.keywordDescription', {
      defaultMessage: 'Keyword'
    }),
    documentation: {
      main: '/keyword.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.keywordLongDescription",
        defaultMessage: "Keyword fields support searching for an exact value and are useful for filtering, sorting, and aggregations. To index full-text content, such as an email body, use the {textType}.",
        values: {
          textType: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getTypeDocLink('text'),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.keywordLongDescription.textTypeLink', {
            defaultMessage: 'text data type'
          }))
        }
      }));
    }
  },
  numeric: {
    value: 'numeric',
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.numericDescription', {
      defaultMessage: 'Numeric'
    }),
    documentation: {
      main: '/number.html'
    },
    subTypes: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.numericSubtypeDescription', {
        defaultMessage: 'Numeric type'
      }),
      types: ['byte', 'double', 'float', 'half_float', 'integer', 'long', 'scaled_float', 'short']
    }
  },
  byte: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.byteDescription', {
      defaultMessage: 'Byte'
    }),
    value: 'byte',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.byteLongDescription",
        defaultMessage: "Byte fields accept a signed 8-bit integer with a minimum value of {minValue} and a maximum value of {maxValue}.",
        values: {
          minValue: _react.default.createElement(_eui.EuiCode, null, "-128"),
          maxValue: _react.default.createElement(_eui.EuiCode, null, "127")
        }
      }));
    }
  },
  double: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.doubleDescription', {
      defaultMessage: 'Double'
    }),
    value: 'double',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.doubleLongDescription",
        defaultMessage: "Double fields accept a double-precision 64-bit floating point number, restricted to finite values (IEEE 754)."
      }));
    }
  },
  integer: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.integerDescription', {
      defaultMessage: 'Integer'
    }),
    value: 'integer',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.integerLongDescription",
        defaultMessage: "Integer fields accept a signed 32-bit integer with a minimum value of {minValue} and a maximum value of {maxValue}.",
        values: {
          minValue: _react.default.createElement(_eui.EuiCode, null, "-2", _react.default.createElement("sup", {
            className: "eui-alignTop"
          }, "31")),
          maxValue: _react.default.createElement(_eui.EuiCode, null, "2", _react.default.createElement("sup", {
            className: "eui-alignTop"
          }, "31"), "-1")
        }
      }));
    }
  },
  long: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.longDescription', {
      defaultMessage: 'Long'
    }),
    value: 'long',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.longLongDescription",
        defaultMessage: "Long fields accept a signed 64-bit integer with a minimum value of {minValue} and a maximum value of {maxValue}.",
        values: {
          minValue: _react.default.createElement(_eui.EuiCode, null, "-2", _react.default.createElement("sup", {
            className: "eui-alignTop"
          }, "63")),
          maxValue: _react.default.createElement(_eui.EuiCode, null, "2", _react.default.createElement("sup", {
            className: "eui-alignTop"
          }, "63"), "-1")
        }
      }));
    }
  },
  float: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.floatDescription', {
      defaultMessage: 'Float'
    }),
    value: 'float',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.floatLongDescription",
        defaultMessage: "Float fields accept a single-precision 32-bit floating point number, restricted to finite values (IEEE 754)."
      }));
    }
  },
  half_float: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.halfFloatDescription', {
      defaultMessage: 'Half float'
    }),
    value: 'half_float',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.halfFloatLongDescription",
        defaultMessage: "Half-float fields accept a half-precision 16-bit floating point number, restricted to finite values (IEEE 754)."
      }));
    }
  },
  scaled_float: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.scaledFloatDescription', {
      defaultMessage: 'Scaled float'
    }),
    value: 'scaled_float',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.scaledFloatLongDescription",
        defaultMessage: "Scaled-float fields accept a floating point number that is backed by a {longType} and scaled by a fixed {doubleType} scaling factor. Use this data type to store floating point data into an integer using a scaling factor. This saves disk space, but affects accuracy.",
        values: {
          longType: _react.default.createElement(_eui.EuiCode, null, "long"),
          doubleType: _react.default.createElement(_eui.EuiCode, null, "double")
        }
      }));
    }
  },
  short: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.shortDescription', {
      defaultMessage: 'Short'
    }),
    value: 'short',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.shortLongDescription",
        defaultMessage: "Short fields accept a signed 16-bit integer with a minimum value of {minValue} and a maximum value of {maxValue}.",
        values: {
          minValue: _react.default.createElement(_eui.EuiCode, null, "-32,768"),
          maxValue: _react.default.createElement(_eui.EuiCode, null, "32,767")
        }
      }));
    }
  },
  date: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.dateDescription', {
      defaultMessage: 'Date'
    }),
    value: 'date',
    documentation: {
      main: '/date.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.dateLongDescription",
        defaultMessage: "Date fields accept strings with formatted dates (\"2015/01/01 12:10:30\"), long numbers representing milliseconds since the epoch, and integers representing seconds since the epoch. Multiple date formats are allowed. Dates with timezones are converted to UTC."
      }));
    }
  },
  date_nanos: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.dateNanosDescription', {
      defaultMessage: 'Date nanoseconds'
    }),
    value: 'date_nanos',
    documentation: {
      main: '/date_nanos.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.dateNanosLongDescription",
        defaultMessage: "Date nanoseconds fields store dates in nanosecond resolution. Aggregations remain in millisecond resolution. To store dates in millisecond resolution, use the {date}.",
        values: {
          date: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getTypeDocLink('date'),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.dateNanosLongDescription.dateTypeLink', {
            defaultMessage: 'date data type'
          }))
        }
      }));
    }
  },
  binary: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.binaryDescription', {
      defaultMessage: 'Binary'
    }),
    value: 'binary',
    documentation: {
      main: '/binary.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.binaryLongDescription",
        defaultMessage: "Binary fields accept a binary value as a Base64-encoded string. By default, binary fields are not stored or searchable."
      }));
    }
  },
  ip: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.ipDescription', {
      defaultMessage: 'IP'
    }),
    value: 'ip',
    documentation: {
      main: '/ip.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.ipLongDescription",
        defaultMessage: "IP fields accept IPv4 or IPv6 addresses. If you need to store IP ranges in a single field, use the {ipRange}.",
        values: {
          ipRange: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getTypeDocLink('range'),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.ipLongDescription.ipRangeTypeLink', {
            defaultMessage: 'IP range data type'
          }))
        }
      }));
    }
  },
  boolean: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.booleanDescription', {
      defaultMessage: 'Boolean'
    }),
    value: 'boolean',
    documentation: {
      main: '/boolean.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.booleanLongDescription",
        defaultMessage: "Boolean fields accept JSON {true} and {false} values, as well as strings which are interpreted as true or false.",
        values: {
          true: _react.default.createElement(_eui.EuiCode, null, "true"),
          false: _react.default.createElement(_eui.EuiCode, null, "false")
        }
      }));
    }
  },
  range: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.rangeDescription', {
      defaultMessage: 'Range'
    }),
    value: 'range',
    documentation: {
      main: '/range.html'
    },
    subTypes: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.rangeSubtypeDescription', {
        defaultMessage: 'Range type'
      }),
      types: ['date_range', 'double_range', 'float_range', 'integer_range', 'ip_range', 'long_range']
    }
  },
  object: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.objectDescription', {
      defaultMessage: 'Object'
    }),
    value: 'object',
    documentation: {
      main: '/object.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.objectLongDescription",
        defaultMessage: "Object fields can contain children, which are queried as a flattened list. To query child objects independently, use the {nested}.",
        values: {
          nested: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getTypeDocLink('nested'),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.objectLongDescription.nestedTypeLink', {
            defaultMessage: 'nested data type'
          }))
        }
      }));
    }
  },
  nested: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.nestedDescription', {
      defaultMessage: 'Nested'
    }),
    value: 'nested',
    documentation: {
      main: '/nested.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.nestedLongDescription",
        defaultMessage: "Like {objects}, nested fields can contain children. The difference is that you can query their child objects independently.",
        values: {
          objects: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getTypeDocLink('object'),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.nestedLongDescription.objectTypeLink', {
            defaultMessage: 'objects'
          }))
        }
      }));
    }
  },
  rank_feature: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.rankFeatureDescription', {
      defaultMessage: 'Rank feature'
    }),
    value: 'rank_feature',
    documentation: {
      main: '/rank-feature.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.rankFeatureLongDescription",
        defaultMessage: "The rank feature field accepts a number that will boost documents in {rankFeatureQuery}.",
        values: {
          rankFeatureQuery: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getRankFeatureQueryLink(),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.rankFeatureLongDescription.queryLink', {
            defaultMessage: 'rank_feature queries'
          }))
        }
      }));
    }
  },
  rank_features: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.rankFeaturesDescription', {
      defaultMessage: 'Rank features'
    }),
    value: 'rank_features',
    documentation: {
      main: '/rank-features.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.rankFeaturesLongDescription",
        defaultMessage: "The rank features field accepts numeric vectors that will boost documents in {rankFeatureQuery}.",
        values: {
          rankFeatureQuery: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getRankFeatureQueryLink(),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.rankFeaturesLongDescription.queryLink', {
            defaultMessage: 'rank_feature queries'
          }))
        }
      }));
    }
  },
  dense_vector: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.denseVectorDescription', {
      defaultMessage: 'Dense vector'
    }),
    value: 'dense_vector',
    documentation: {
      main: '/dense-vector.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.denseVectorLongDescription",
        defaultMessage: "Dense vector fields store vectors of float values, useful for document scoring."
      }));
    }
  },
  date_range: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.dateRangeDescription', {
      defaultMessage: 'Date range'
    }),
    value: 'date_range',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.dateRangeLongDescription",
        defaultMessage: "Date range fields accept an unsigned 64-bit integer representing milliseconds since the system epoch."
      }));
    }
  },
  double_range: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.doubleRangeDescription', {
      defaultMessage: 'Double range'
    }),
    value: 'double_range',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.doubleRangeLongDescription",
        defaultMessage: "Double range fields accept a 64-bit double precision floating point number (IEEE 754 binary64)."
      }));
    }
  },
  float_range: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.floatRangeDescription', {
      defaultMessage: 'Float range'
    }),
    value: 'float_range',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.floatRangeLongDescription",
        defaultMessage: "Float range fields accept a 32-bit single precision floating point number (IEEE 754 binary32)."
      }));
    }
  },
  integer_range: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.integerRangeDescription', {
      defaultMessage: 'Integer range'
    }),
    value: 'integer_range',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.integerRangeLongDescription",
        defaultMessage: "Integer range fields accept a signed 32-bit integer."
      }));
    }
  },
  long_range: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.longRangeDescription', {
      defaultMessage: 'Long range'
    }),
    value: 'long_range',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.longRangeLongDescription",
        defaultMessage: "Long range fields accept a signed 64-bit integer."
      }));
    }
  },
  ip_range: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.ipRangeDescription', {
      defaultMessage: 'IP range'
    }),
    value: 'ip_range',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.ipRangeLongDescription",
        defaultMessage: "IP range fields accept an IPv4 or IPV6 address."
      }));
    }
  },
  geo_point: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.geoPointDescription', {
      defaultMessage: 'Geo-point'
    }),
    value: 'geo_point',
    documentation: {
      main: '/geo-point.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.geoPointLongDescription",
        defaultMessage: "Geo-point fields accept latitude and longitude pairs. Use this data type to search within a bounding box, aggregate documents geographically, and sort documents by distance."
      }));
    }
  },
  geo_shape: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.geoShapeDescription', {
      defaultMessage: 'Geo-shape'
    }),
    value: 'geo_shape',
    documentation: {
      main: '/geo-shape.html',
      learnMore: '/geo-shape.html#geoshape-indexing-approach'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.geoShapeType.fieldDescription",
        defaultMessage: "Geo-shapes are indexed by decomposing the shape into a triangular mesh and indexing each triangle as a 7-dimensional point in a BKD tree. {docsLink}",
        values: {
          docsLink: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getTypeDocLink('geo_shape', 'learnMore'),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.geoShapeType.fieldDescription.learnMoreLink', {
            defaultMessage: 'Learn more.'
          }))
        }
      }));
    }
  },
  completion: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.completionSuggesterDescription', {
      defaultMessage: 'Completion suggester'
    }),
    value: 'completion',
    documentation: {
      main: '/search-suggesters.html#completion-suggester'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.completionSuggesterLongDescription",
        defaultMessage: "Completion suggester fields support autocomplete, but require special data structures that occupy memory and build slowly."
      }));
    }
  },
  token_count: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.tokenCountDescription', {
      defaultMessage: 'Token count'
    }),
    value: 'token_count',
    documentation: {
      main: '/token-count.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.tokenCountLongDescription",
        defaultMessage: "Token count fields accept string values.  These values are analyzed, and the number of tokens in the string are indexed."
      }));
    }
  },
  percolator: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.percolatorDescription', {
      defaultMessage: 'Percolator'
    }),
    value: 'percolator',
    documentation: {
      main: '/percolator.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.percolatorLongDescription",
        defaultMessage: "The percolator data type enables {percolator}.",
        values: {
          percolator: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationService.getPercolatorQueryLink(),
            target: "_blank"
          }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.percolatorLongDescription.learnMoreLink', {
            defaultMessage: 'percolator queries'
          }))
        }
      }));
    }
  },
  join: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.joinDescription', {
      defaultMessage: 'Join'
    }),
    value: 'join',
    documentation: {
      main: '/parent-join.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.joinLongDescription",
        defaultMessage: "Join fields define parent-child relationships among documents of the same index."
      }));
    }
  },
  alias: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.aliasDescription', {
      defaultMessage: 'Alias'
    }),
    value: 'alias',
    documentation: {
      main: '/alias.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.aliasLongDescription",
        defaultMessage: "Alias fields accept an alternative name for a field, which you can use in search requests."
      }));
    }
  },
  search_as_you_type: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.searchAsYouTypeDescription', {
      defaultMessage: 'Search-as-you-type'
    }),
    value: 'search_as_you_type',
    documentation: {
      main: '/search-as-you-type.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.searchAsYouTypeLongDescription",
        defaultMessage: "Search-as-you-type fields break strings into subfields for search suggestions, and will match terms at any position in the string."
      }));
    }
  },
  flattened: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.flattenedDescription', {
      defaultMessage: 'Flattened'
    }),
    value: 'flattened',
    documentation: {
      main: '/flattened.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.flattenedLongDescription",
        defaultMessage: "Flattened fields map an object as a single field and are useful for indexing objects with a large or unknown number of unique keys. Flattened fields support basic queries only."
      }));
    }
  },
  shape: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.shapeDescription', {
      defaultMessage: 'Shape'
    }),
    value: 'shape',
    documentation: {
      main: '/shape.html'
    },
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.shapeLongDescription",
        defaultMessage: "Shape fields enable searching of complex shapes, such as rectangles and polygons."
      }));
    }
  },
  other: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dataType.otherDescription', {
      defaultMessage: 'Other'
    }),
    value: 'other',
    description: function description() {
      return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.dataType.otherLongDescription",
        defaultMessage: "Specify type parameters in JSON."
      }));
    }
  }
};
exports.TYPE_DEFINITION = TYPE_DEFINITION;
var MAIN_TYPES = ['alias', 'binary', 'boolean', 'completion', 'date', 'date_nanos', 'dense_vector', 'flattened', 'geo_point', 'geo_shape', 'ip', 'join', 'keyword', 'nested', 'numeric', 'object', 'percolator', 'range', 'rank_feature', 'rank_features', 'search_as_you_type', 'shape', 'text', 'token_count', 'other'];
exports.MAIN_TYPES = MAIN_TYPES;
var MAIN_DATA_TYPE_DEFINITION = MAIN_TYPES.reduce(function (acc, type) {
  return _objectSpread({}, acc, _defineProperty({}, type, TYPE_DEFINITION[type]));
}, {});
/**
 * Return a map of subType -> mainType
 *
 * @example
 *
 * {
 *   long: 'numeric',
 *   integer: 'numeric',
 *   short: 'numeric',
 * }
 */

exports.MAIN_DATA_TYPE_DEFINITION = MAIN_DATA_TYPE_DEFINITION;
var SUB_TYPE_MAP_TO_MAIN = Object.entries(MAIN_DATA_TYPE_DEFINITION).reduce(function (acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      type = _ref2[0],
      definition = _ref2[1];

  if ({}.hasOwnProperty.call(definition, 'subTypes')) {
    definition.subTypes.types.forEach(function (subType) {
      acc[subType] = type;
    });
  }

  return acc;
}, {}); // Single source of truth of all the possible data types.

exports.SUB_TYPE_MAP_TO_MAIN = SUB_TYPE_MAP_TO_MAIN;
var ALL_DATA_TYPES = [].concat(_toConsumableArray(Object.keys(MAIN_DATA_TYPE_DEFINITION)), _toConsumableArray(Object.keys(SUB_TYPE_MAP_TO_MAIN)));
exports.ALL_DATA_TYPES = ALL_DATA_TYPES;