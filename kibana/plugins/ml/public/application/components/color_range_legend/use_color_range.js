"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useColorRange = exports.colorRangeOptions = exports.COLOR_RANGE = exports.colorRangeScaleOptions = exports.COLOR_RANGE_SCALE = exports.influencerColorScaleFactory = void 0;

var _d = _interopRequireDefault(require("d3"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _i18n = require("@kbn/i18n");

var _use_ui_settings_context = require("../../contexts/kibana/use_ui_settings_context");

var _colorDomains;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Custom color scale factory that takes the amount of feature influencers
 * into account to adjust the contrast of the color range. This is used for
 * color coding for outlier detection where the amount of feature influencers
 * affects the threshold from which the influencers value can actually be
 * considered influential.
 *
 * @param n number of influencers
 * @returns a function suitable as a preprocessor for d3.scale.linear()
 */
var influencerColorScaleFactory = function influencerColorScaleFactory(n) {
  return function (t) {
    // for 1 influencer or less we fall back to a plain linear scale.
    if (n <= 1) {
      return t;
    }

    if (t < 1 / n) {
      return 0;
    }

    if (t < 3 / n) {
      return n / 4 * (t - 1 / n);
    }

    return 0.5 + (t - 3 / n);
  };
};

exports.influencerColorScaleFactory = influencerColorScaleFactory;
var COLOR_RANGE_SCALE;
/**
 * Color range scale options in the format for EuiSelect's options prop.
 */

exports.COLOR_RANGE_SCALE = COLOR_RANGE_SCALE;

(function (COLOR_RANGE_SCALE) {
  COLOR_RANGE_SCALE["LINEAR"] = "linear";
  COLOR_RANGE_SCALE["INFLUENCER"] = "influencer";
  COLOR_RANGE_SCALE["SQRT"] = "sqrt";
})(COLOR_RANGE_SCALE || (exports.COLOR_RANGE_SCALE = COLOR_RANGE_SCALE = {}));

var colorRangeScaleOptions = [{
  value: COLOR_RANGE_SCALE.LINEAR,
  text: _i18n.i18n.translate('xpack.ml.components.colorRangeLegend.linearScaleLabel', {
    defaultMessage: 'Linear'
  })
}, {
  value: COLOR_RANGE_SCALE.INFLUENCER,
  text: _i18n.i18n.translate('xpack.ml.components.colorRangeLegend.influencerScaleLabel', {
    defaultMessage: 'Influencer custom scale'
  })
}, {
  value: COLOR_RANGE_SCALE.SQRT,
  text: _i18n.i18n.translate('xpack.ml.components.colorRangeLegend.sqrtScaleLabel', {
    defaultMessage: 'Sqrt'
  })
}];
exports.colorRangeScaleOptions = colorRangeScaleOptions;
var COLOR_RANGE;
/**
 * Color range options in the format for EuiSelect's options prop.
 */

exports.COLOR_RANGE = COLOR_RANGE;

(function (COLOR_RANGE) {
  COLOR_RANGE["BLUE"] = "blue";
  COLOR_RANGE["RED"] = "red";
  COLOR_RANGE["RED_GREEN"] = "red-green";
  COLOR_RANGE["GREEN_RED"] = "green-red";
  COLOR_RANGE["YELLOW_GREEN_BLUE"] = "yellow-green-blue";
})(COLOR_RANGE || (exports.COLOR_RANGE = COLOR_RANGE = {}));

var colorRangeOptions = [{
  value: COLOR_RANGE.BLUE,
  text: _i18n.i18n.translate('xpack.ml.components.colorRangeLegend.blueColorRangeLabel', {
    defaultMessage: 'Blue'
  })
}, {
  value: COLOR_RANGE.RED,
  text: _i18n.i18n.translate('xpack.ml.components.colorRangeLegend.redColorRangeLabel', {
    defaultMessage: 'Red'
  })
}, {
  value: COLOR_RANGE.RED_GREEN,
  text: _i18n.i18n.translate('xpack.ml.components.colorRangeLegend.redGreenColorRangeLabel', {
    defaultMessage: 'Red - Green'
  })
}, {
  value: COLOR_RANGE.GREEN_RED,
  text: _i18n.i18n.translate('xpack.ml.components.colorRangeLegend.greenRedColorRangeLabel', {
    defaultMessage: 'Green - Red'
  })
}, {
  value: COLOR_RANGE.YELLOW_GREEN_BLUE,
  text: _i18n.i18n.translate('xpack.ml.components.colorRangeLegend.yellowGreenBlueColorRangeLabel', {
    defaultMessage: 'Yellow - Green - Blue'
  })
}];
/**
 * A custom Yellow-Green-Blue color range to demonstrate the support
 * for more complex ranges with more than two colors.
 */

exports.colorRangeOptions = colorRangeOptions;
var coloursYGB = ['#FFFFDD', '#AAF191', '#80D385', '#61B385', '#3E9583', '#217681', '#285285', '#1F2D86', '#000086'];

var colourRangeYGB = _d.default.range(0, 1, 1.0 / (coloursYGB.length - 1));

colourRangeYGB.push(1);
var colorDomains = (_colorDomains = {}, _defineProperty(_colorDomains, COLOR_RANGE.BLUE, [0, 1]), _defineProperty(_colorDomains, COLOR_RANGE.RED, [0, 1]), _defineProperty(_colorDomains, COLOR_RANGE.RED_GREEN, [0, 1]), _defineProperty(_colorDomains, COLOR_RANGE.GREEN_RED, [0, 1]), _defineProperty(_colorDomains, COLOR_RANGE.YELLOW_GREEN_BLUE, colourRangeYGB), _colorDomains);
/**
 * Custom hook to get a d3 based color range to be used for color coding in table cells.
 *
 * @param colorRange COLOR_RANGE enum.
 * @param colorRangeScale COLOR_RANGE_SCALE enum.
 * @param featureCount
 */

var useColorRange = function useColorRange() {
  var _colorRanges, _scaleTypes;

  var colorRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : COLOR_RANGE.BLUE;
  var colorRangeScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : COLOR_RANGE_SCALE.LINEAR;
  var featureCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var euiTheme = (0, _use_ui_settings_context.useUiSettings)().get('theme:darkMode') ? _eui_theme_dark.default : _eui_theme_light.default;
  var colorRanges = (_colorRanges = {}, _defineProperty(_colorRanges, COLOR_RANGE.BLUE, [_d.default.rgb(euiTheme.euiColorEmptyShade), _d.default.rgb(euiTheme.euiColorVis1)]), _defineProperty(_colorRanges, COLOR_RANGE.RED, [_d.default.rgb(euiTheme.euiColorEmptyShade), _d.default.rgb(euiTheme.euiColorDanger)]), _defineProperty(_colorRanges, COLOR_RANGE.RED_GREEN, ['red', 'green']), _defineProperty(_colorRanges, COLOR_RANGE.GREEN_RED, ['green', 'red']), _defineProperty(_colorRanges, COLOR_RANGE.YELLOW_GREEN_BLUE, coloursYGB), _colorRanges);

  var linearScale = _d.default.scale.linear().domain(colorDomains[colorRange]) // typings for .range() incorrectly don't allow passing in a color extent.
  // @ts-ignore
  .range(colorRanges[colorRange]);

  var influencerColorScale = influencerColorScaleFactory(featureCount);

  var influencerScaleLinearWrapper = function influencerScaleLinearWrapper(n) {
    return linearScale(influencerColorScale(n));
  };

  var scaleTypes = (_scaleTypes = {}, _defineProperty(_scaleTypes, COLOR_RANGE_SCALE.LINEAR, linearScale), _defineProperty(_scaleTypes, COLOR_RANGE_SCALE.INFLUENCER, influencerScaleLinearWrapper), _defineProperty(_scaleTypes, COLOR_RANGE_SCALE.SQRT, _d.default.scale.sqrt().domain(colorDomains[colorRange]) // typings for .range() incorrectly don't allow passing in a color extent.
  // @ts-ignore
  .range(colorRanges[colorRange])), _scaleTypes);
  return scaleTypes[colorRangeScale];
};

exports.useColorRange = useColorRange;