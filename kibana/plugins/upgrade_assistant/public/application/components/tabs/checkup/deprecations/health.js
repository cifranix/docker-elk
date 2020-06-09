"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeprecationHealth = exports.LocalizedActions = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var LocalizedLevels = {
  warning: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.deprecations.warningLabel', {
    defaultMessage: 'warning'
  }),
  critical: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.deprecations.criticalLabel', {
    defaultMessage: 'critical'
  })
};
var LocalizedActions = {
  warning: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.deprecations.warningActionTooltip', {
    defaultMessage: 'Resolving this issue before upgrading is advised, but not required.'
  }),
  critical: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.deprecations.criticalActionTooltip', {
    defaultMessage: 'Resolve this issue before upgrading.'
  })
};
exports.LocalizedActions = LocalizedActions;

var SingleHealth = function SingleHealth(_ref) {
  var level = _ref.level,
      label = _ref.label;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiToolTip, {
    content: LocalizedActions[level]
  }, _react.default.createElement(_eui.EuiBadge, {
    color: _constants.COLOR_MAP[level]
  }, label)), "\u2003");
};
/**
 * Displays a summary health for a list of deprecations that shows the number and level of severity
 * deprecations in the list.
 */


var DeprecationHealth = function DeprecationHealth(_ref2) {
  var deprecations = _ref2.deprecations,
      _ref2$single = _ref2.single,
      single = _ref2$single === void 0 ? false : _ref2$single;

  if (deprecations.length === 0) {
    return _react.default.createElement("span", null);
  }

  var levels = deprecations.map(function (d) {
    return _constants.LEVEL_MAP[d.level];
  });

  if (single) {
    var highest = Math.max.apply(Math, _toConsumableArray(levels));
    var highestLevel = _constants.REVERSE_LEVEL_MAP[highest];
    return _react.default.createElement(SingleHealth, {
      level: highestLevel,
      label: LocalizedLevels[highestLevel]
    });
  }

  var countByLevel = (0, _lodash.countBy)(levels);
  return _react.default.createElement(_react.default.Fragment, null, Object.keys(countByLevel).map(function (k) {
    return parseInt(k, 10);
  }).sort().map(function (level) {
    return [level, _constants.REVERSE_LEVEL_MAP[level]];
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        numLevel = _ref4[0],
        stringLevel = _ref4[1];

    return _react.default.createElement(SingleHealth, {
      key: stringLevel,
      level: stringLevel,
      label: "".concat(countByLevel[numLevel], " ").concat(LocalizedLevels[stringLevel])
    });
  }));
};

exports.DeprecationHealth = DeprecationHealth;