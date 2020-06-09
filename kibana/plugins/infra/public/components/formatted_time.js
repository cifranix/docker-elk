"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormattedTime = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _react = require("react");

var _use_kibana_ui_setting = require("../utils/use_kibana_ui_setting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getFormattedTime = function getFormattedTime(time, userFormat) {
  var fallbackFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Y-MM-DD HH:mm:ss.SSS';
  return userFormat ? (0, _moment.default)(time).format(userFormat) : (0, _moment.default)(time).format(fallbackFormat);
};

var useFormattedTime = function useFormattedTime(time) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'dateTime' : _ref$format,
      fallbackFormat = _ref.fallbackFormat;

  // `dateFormat:scaled` is an array of `[key, format]` tuples.
  // The hook might return `undefined`, so use a sane default for the `find` later.
  var scaledTuples = (0, _use_kibana_ui_setting.useKibanaUiSetting)('dateFormat:scaled')[0] || [['', undefined]];
  var formatMap = {
    dateTime: (0, _use_kibana_ui_setting.useKibanaUiSetting)('dateFormat')[0],
    time: scaledTuples.find(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
          key = _ref3[0];

      return key === '';
    })[1]
  };
  var dateFormat = formatMap[format];
  var formattedTime = (0, _react.useMemo)(function () {
    return getFormattedTime(time, dateFormat, fallbackFormat);
  }, [time, dateFormat, fallbackFormat]);
  return formattedTime;
};

exports.useFormattedTime = useFormattedTime;