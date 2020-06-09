"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionItem = void 0;

var _eui = require("@elastic/eui");

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

var _public2 = require("../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  flex: 3 0 0;\n\n  p {\n    display: inline;\n\n    span {\n      font-family: ", ";\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  flex: 2 0 0;\n  font-family: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  color: ", ";\n  flex: 0 0 auto;\n  justify-content: center;\n  width: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  height: ", ";\n  padding: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  font-size: ", ";\n  height: ", ";\n  white-space: nowrap;\n  background-color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SuggestionItem = function SuggestionItem(props) {
  var isSelected = props.isSelected,
      onClick = props.onClick,
      onMouseEnter = props.onMouseEnter,
      suggestion = props.suggestion;
  return _react.default.createElement(SuggestionItemContainer, {
    isSelected: isSelected,
    onClick: onClick,
    onMouseEnter: onMouseEnter
  }, _react.default.createElement(SuggestionItemIconField, {
    suggestionType: suggestion.type
  }, _react.default.createElement(_eui.EuiIcon, {
    type: getEuiIconType(suggestion.type)
  })), _react.default.createElement(SuggestionItemTextField, null, suggestion.text), _react.default.createElement(SuggestionItemDescriptionField, null, suggestion.description));
};

exports.SuggestionItem = SuggestionItem;
SuggestionItem.defaultProps = {
  isSelected: false
};

var SuggestionItemContainer = _public.euiStyled.div(_templateObject(), function (props) {
  return props.theme.eui.euiFontSizeS;
}, function (props) {
  return props.theme.eui.euiSizeXL;
}, function (props) {
  return props.isSelected ? props.theme.eui.euiColorLightestShade : 'transparent';
});

var SuggestionItemField = _public.euiStyled.div(_templateObject2(), function (props) {
  return props.theme.eui.euiSizeXL;
}, function (props) {
  return props.theme.eui.euiSizeXS;
});

var SuggestionItemIconField = (0, _public.euiStyled)(SuggestionItemField)(_templateObject3(), function (props) {
  return (0, _polished.transparentize)(0.9, getEuiIconColor(props.theme, props.suggestionType));
}, function (props) {
  return getEuiIconColor(props.theme, props.suggestionType);
}, function (props) {
  return props.theme.eui.euiSizeXL;
});
var SuggestionItemTextField = (0, _public.euiStyled)(SuggestionItemField)(_templateObject4(), function (props) {
  return props.theme.eui.euiCodeFontFamily;
});
var SuggestionItemDescriptionField = (0, _public.euiStyled)(SuggestionItemField)(_templateObject5(), function (props) {
  return props.theme.eui.euiCodeFontFamily;
});

var getEuiIconType = function getEuiIconType(suggestionType) {
  switch (suggestionType) {
    case _public2.QuerySuggestionTypes.Field:
      return 'kqlField';

    case _public2.QuerySuggestionTypes.Value:
      return 'kqlValue';

    case _public2.QuerySuggestionTypes.RecentSearch:
      return 'search';

    case _public2.QuerySuggestionTypes.Conjunction:
      return 'kqlSelector';

    case _public2.QuerySuggestionTypes.Operator:
      return 'kqlOperand';

    default:
      return 'empty';
  }
};

var getEuiIconColor = function getEuiIconColor(theme, suggestionType) {
  switch (suggestionType) {
    case _public2.QuerySuggestionTypes.Field:
      return theme.eui.euiColorVis7;

    case _public2.QuerySuggestionTypes.Value:
      return theme.eui.euiColorVis0;

    case _public2.QuerySuggestionTypes.Operator:
      return theme.eui.euiColorVis1;

    case _public2.QuerySuggestionTypes.Conjunction:
      return theme.eui.euiColorVis2;

    case _public2.QuerySuggestionTypes.RecentSearch:
    default:
      return theme.eui.euiColorMediumShade;
  }
};