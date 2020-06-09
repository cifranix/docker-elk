"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThresholdWatchEdit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _constants = require("../../../../../../common/constants");

var _serialization = require("../../../../../../common/lib/serialization");

var _components = require("../../../../components");

var _api = require("../../../../lib/api");

var _agg_types = require("../../../../models/watch/agg_types");

var _group_by_types = require("../../../../models/watch/group_by_types");

var _comparators = require("../../../../models/watch/comparators");

var _watch_edit_actions = require("../../watch_edit_actions");

var _watch_context = require("../../watch_context");

var _watch_visualization = require("./watch_visualization");

var _threshold_watch_action_panel = require("./threshold_watch_action_panel");

var _get_time_unit_label = require("../../../../lib/get_time_unit_label");

var _navigation = require("../../../../lib/navigation");

var _request_flyout = require("../request_flyout");

var _app_context = require("../../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var expressionFieldsWithValidation = ['aggField', 'termSize', 'termField', 'threshold0', 'threshold1', 'timeWindowSize'];
var expressionFields = ['aggType', 'aggField', 'termSize', 'termField', 'thresholdComparator', 'timeWindowSize', 'timeWindowUnit', 'triggerIntervalSize', 'triggerIntervalUnit', 'threshold', 'groupBy'];

var expressionErrorMessage = _i18n.i18n.translate('xpack.watcher.thresholdWatchExpression.fixErrorInExpressionBelowValidationMessage', {
  defaultMessage: 'Expression contains errors.'
});

var firstFieldOption = {
  text: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.titlePanel.timeFieldOptionLabel', {
    defaultMessage: 'Select a field'
  }),
  value: ''
};

var getTimeOptions = function getTimeOptions(unitSize) {
  return Object.entries(_constants.TIME_UNITS).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        _key = _ref2[0],
        value = _ref2[1];

    return {
      text: (0, _get_time_unit_label.getTimeUnitLabel)(value, unitSize),
      value: value
    };
  });
};

var getFields =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(indices) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _api.fetchFields)(indices);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getFields(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var getTimeFieldOptions = function getTimeFieldOptions(fields) {
  var options = [firstFieldOption];
  fields.forEach(function (field) {
    if (field.type === 'date') {
      options.push({
        text: field.name,
        value: field.name
      });
    }
  });
  return options;
};

var getIndexOptions =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(patternString, indexPatterns) {
    var options, matchingIndices, matchingIndexPatterns, matchingOptions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = [];

            if (patternString) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", options);

          case 3:
            _context2.next = 5;
            return (0, _api.getMatchingIndices)(patternString);

          case 5:
            matchingIndices = _context2.sent;
            matchingIndexPatterns = indexPatterns.filter(function (anIndexPattern) {
              return anIndexPattern.includes(patternString);
            });

            if (matchingIndices.length || matchingIndexPatterns.length) {
              matchingOptions = _.uniq([].concat(_toConsumableArray(matchingIndices), _toConsumableArray(matchingIndexPatterns)));
              options.push({
                label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.titlePanel.indicesAndIndexPatternsLabel', {
                  defaultMessage: 'Based on your indices and index patterns'
                }),
                options: matchingOptions.map(function (match) {
                  return {
                    label: match,
                    value: match
                  };
                }).sort(function (a, b) {
                  return String(a.label).localeCompare(b.label);
                })
              });
            }

            options.push({
              label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.titlePanel.chooseLabel', {
                defaultMessage: 'Choose…'
              }),
              options: [{
                key: 'UNIQUE_CHOOSE_KEY',
                value: patternString,
                label: patternString
              }]
            });
            return _context2.abrupt("return", options);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getIndexOptions(_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

var ThresholdWatchEdit = function ThresholdWatchEdit(_ref5) {
  var pageTitle = _ref5.pageTitle;

  // hooks
  var _useAppContext = (0, _app_context.useAppContext)(),
      toasts = _useAppContext.toasts;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      indexPatterns = _useState2[0],
      setIndexPatterns = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      esFields = _useState4[0],
      setEsFields = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      indexOptions = _useState6[0],
      setIndexOptions = _useState6[1];

  var _useState7 = (0, _react.useState)([firstFieldOption]),
      _useState8 = _slicedToArray(_useState7, 2),
      timeFieldOptions = _useState8[0],
      setTimeFieldOptions = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      aggFieldPopoverOpen = _useState10[0],
      setAggFieldPopoverOpen = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      groupByPopoverOpen = _useState12[0],
      setGroupByPopoverOpen = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      watchThresholdPopoverOpen = _useState14[0],
      setWatchThresholdPopoverOpen = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      watchDurationPopoverOpen = _useState16[0],
      setWatchDurationPopoverOpen = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      aggTypePopoverOpen = _useState18[0],
      setAggTypePopoverOpen = _useState18[1];

  var _useState19 = (0, _react.useState)(null),
      _useState20 = _slicedToArray(_useState19, 2),
      serverError = _useState20[0],
      setServerError = _useState20[1];

  var _useState21 = (0, _react.useState)(false),
      _useState22 = _slicedToArray(_useState21, 2),
      isSaving = _useState22[0],
      setIsSaving = _useState22[1];

  var _useState23 = (0, _react.useState)(false),
      _useState24 = _slicedToArray(_useState23, 2),
      isIndiciesLoading = _useState24[0],
      setIsIndiciesLoading = _useState24[1];

  var _useState25 = (0, _react.useState)(false),
      _useState26 = _slicedToArray(_useState25, 2),
      isRequestVisible = _useState26[0],
      setIsRequestVisible = _useState26[1];

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch,
      setWatchProperty = _useContext.setWatchProperty;

  (0, _react.useEffect)(function () {
    var getIndexPatterns =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var indexPatternObjects, titles;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _api.loadIndexPatterns)();

              case 2:
                indexPatternObjects = _context3.sent;
                titles = indexPatternObjects.map(function (indexPattern) {
                  return indexPattern.attributes.title;
                });
                setIndexPatterns(titles);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function getIndexPatterns() {
        return _ref6.apply(this, arguments);
      };
    }();

    var loadData =
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var allEsFields, timeFields;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(watch.index && watch.index.length > 0)) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 3;
                return getFields(watch.index);

              case 3:
                allEsFields = _context4.sent;
                timeFields = getTimeFieldOptions(allEsFields);
                setEsFields(allEsFields);
                setTimeFieldOptions(timeFields);
                setWatchProperty('timeFields', timeFields);

              case 8:
                getIndexPatterns();

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function loadData() {
        return _ref7.apply(this, arguments);
      };
    }();

    loadData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var _watch$validate = watch.validate(),
      errors = _watch$validate.errors;

  var hasErrors = !!Object.keys(errors).find(function (errorKey) {
    return errors[errorKey].length >= 1;
  });
  var actionErrors = watch.actions.reduce(function (acc, action) {
    var actionValidationErrors = action.validate();
    acc[action.id] = actionValidationErrors;
    return acc;
  }, {});
  var hasActionErrors = !!Object.keys(actionErrors).find(function (actionError) {
    return !!Object.keys(actionErrors[actionError]).find(function (actionErrorKey) {
      return actionErrors[actionError][actionErrorKey].length >= 1;
    });
  });
  var hasExpressionErrors = !!Object.keys(errors).find(function (errorKey) {
    return expressionFieldsWithValidation.includes(errorKey) && errors[errorKey].length >= 1;
  });
  var shouldShowThresholdExpression = watch.index && watch.index.length > 0 && watch.timeField;

  var andThresholdText = _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.andLabel', {
    defaultMessage: 'AND'
  }); // Users might edit the request for use outside of the Watcher app. If they do make changes to it,
  // we have no guarantee it will still be compatible with the threshold alert form, so we strip
  // the metadata to avoid potential conflicts.


  var requestPreviewWatchData = _objectSpread({}, watch.upstreamJson, {
    includeMetadata: false
  });

  return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h1", {
    "data-test-subj": "pageTitle"
  }, pageTitle)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, watch.titleDescription))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiForm, {
    "data-test-subj": "thresholdWatchForm"
  }, serverError && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_components.SectionError, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.json.saveWatchErrorTitle",
      defaultMessage: "Error saving watch"
    }),
    error: serverError
  }), _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_components.ErrableFormRow, {
    id: "watchName",
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.titlePanel.watchNameLabel",
      defaultMessage: "Name"
    }),
    errorKey: "name",
    isShowingErrors: hasErrors && watch.name !== undefined,
    errors: errors
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "name",
    "data-test-subj": "nameInput",
    value: watch.name || '',
    onChange: function onChange(e) {
      setWatchProperty('name', e.target.value);
    },
    onBlur: function onBlur() {
      if (!watch.name) {
        setWatchProperty('name', '');
      }
    }
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_components.ErrableFormRow, {
    id: "indexSelectSearchBox",
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.titlePanel.indicesToQueryLabel",
      defaultMessage: "Indices to query"
    }),
    errorKey: "index",
    isShowingErrors: hasErrors && watch.index !== undefined,
    errors: errors,
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.titlePanel.howToBroadenSearchQueryDescription",
      defaultMessage: "Use * to broaden your query."
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    async: true,
    isLoading: isIndiciesLoading,
    noSuggestions: !indexOptions.length,
    options: indexOptions,
    "data-test-subj": "indicesComboBox",
    selectedOptions: (watch.index || []).map(function (anIndex) {
      return {
        label: anIndex,
        value: anIndex
      };
    }),
    onChange:
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(selected) {
        var indices, currentEsFields, timeFields;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                setWatchProperty('index', selected.map(function (aSelected) {
                  return aSelected.value;
                }));
                indices = selected.map(function (s) {
                  return s.value;
                }); // reset time field and expression fields if indices are deleted

                if (!(indices.length === 0)) {
                  _context5.next = 7;
                  break;
                }

                setTimeFieldOptions(getTimeFieldOptions([]));
                setWatchProperty('timeFields', []);
                expressionFields.forEach(function (expressionField) {
                  setWatchProperty(expressionField, null);
                });
                return _context5.abrupt("return");

              case 7:
                _context5.next = 9;
                return getFields(indices);

              case 9:
                currentEsFields = _context5.sent;
                timeFields = getTimeFieldOptions(currentEsFields);
                setEsFields(currentEsFields);
                setWatchProperty('timeFields', timeFields);
                setTimeFieldOptions(timeFields);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x4) {
        return _ref8.apply(this, arguments);
      };
    }(),
    onSearchChange:
    /*#__PURE__*/
    function () {
      var _ref9 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(search) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                setIsIndiciesLoading(true);
                _context6.t0 = setIndexOptions;
                _context6.next = 4;
                return getIndexOptions(search, indexPatterns);

              case 4:
                _context6.t1 = _context6.sent;
                (0, _context6.t0)(_context6.t1);
                setIsIndiciesLoading(false);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x5) {
        return _ref9.apply(this, arguments);
      };
    }(),
    onBlur: function onBlur() {
      if (!watch.index) {
        setWatchProperty('index', []);
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_components.ErrableFormRow, {
    id: "timeField",
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.titlePanel.timeFieldLabel",
      defaultMessage: "Time field"
    }),
    errorKey: "timeField",
    isShowingErrors: hasErrors && watch.timeField !== undefined,
    errors: errors
  }, _react.default.createElement(_eui.EuiSelect, {
    options: timeFieldOptions,
    fullWidth: true,
    name: "watchTimeField",
    "data-test-subj": "watchTimeFieldSelect",
    value: watch.timeField,
    onChange: function onChange(e) {
      setWatchProperty('timeField', e.target.value);
    },
    onBlur: function onBlur() {
      if (watch.timeField === undefined) {
        setWatchProperty('timeField', '');
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_components.ErrableFormRow, {
    id: "watchInterval",
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.titlePanel.watchIntervalLabel",
      defaultMessage: "Run watch every"
    }),
    errorKey: "triggerIntervalSize",
    isShowingErrors: hasErrors && watch.triggerIntervalSize !== undefined,
    errors: errors
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    fullWidth: true,
    min: 1,
    value: watch.triggerIntervalSize,
    "data-test-subj": "triggerIntervalSizeInput",
    onChange: function onChange(e) {
      var value = e.target.value;
      var triggerIntervalSize = value !== '' ? parseInt(value, 10) : value;
      setWatchProperty('triggerIntervalSize', triggerIntervalSize);
    },
    onBlur: function onBlur(e) {
      if (watch.triggerIntervalSize === undefined) {
        setWatchProperty('triggerIntervalSize', '');
      }
    }
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSelect, {
    fullWidth: true,
    value: watch.triggerIntervalUnit,
    "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchEdit.titlePanel.durationAriaLabel', {
      defaultMessage: 'Duration time unit'
    }),
    onChange: function onChange(e) {
      setWatchProperty('triggerIntervalUnit', e.target.value);
    },
    options: getTimeOptions(watch.triggerIntervalSize)
  })))))), _react.default.createElement(_eui.EuiSpacer, null), shouldShowThresholdExpression ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", {
    "data-test-subj": "watchConditionTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.watchConditionSectionTitle",
    defaultMessage: "Match the following condition"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "aggTypePopover",
    button: _react.default.createElement(_eui.EuiExpression, {
      description: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.whenLabel', {
        defaultMessage: 'when'
      }),
      value: _agg_types.aggTypes[watch.aggType].text,
      isActive: aggTypePopoverOpen,
      onClick: function onClick() {
        setAggTypePopoverOpen(true);
      }
    }),
    isOpen: aggTypePopoverOpen,
    closePopover: function closePopover() {
      setAggTypePopoverOpen(false);
    },
    ownFocus: true,
    withTitle: true,
    anchorPosition: "downLeft"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiPopoverTitle, null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.whenButtonLabel', {
    defaultMessage: 'when'
  })), _react.default.createElement(_eui.EuiSelect, {
    value: watch.aggType,
    onChange: function onChange(e) {
      setWatchProperty('aggType', e.target.value);
      setAggTypePopoverOpen(false);
    },
    options: Object.values(_agg_types.aggTypes).map(function (_ref10) {
      var text = _ref10.text,
          value = _ref10.value;
      return {
        text: text,
        value: value
      };
    })
  })))), watch.aggType && _agg_types.aggTypes[watch.aggType].fieldRequired ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "aggFieldPopover",
    button: _react.default.createElement(_eui.EuiExpression, {
      description: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.ofLabel', {
        defaultMessage: 'of'
      }),
      value: watch.aggField || firstFieldOption.text,
      isActive: aggFieldPopoverOpen || !watch.aggField,
      onClick: function onClick() {
        setAggFieldPopoverOpen(true);
      },
      color: watch.aggField ? 'secondary' : 'danger'
    }),
    isOpen: aggFieldPopoverOpen,
    closePopover: function closePopover() {
      setAggFieldPopoverOpen(false);
    },
    anchorPosition: "downLeft"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiPopoverTitle, null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.ofButtonLabel', {
    defaultMessage: 'of'
  })), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "watcherThresholdAlertAggFieldContainer"
  }, _react.default.createElement(_components.ErrableFormRow, {
    errorKey: "aggField",
    isShowingErrors: hasErrors && watch.aggField !== undefined,
    errors: errors
  }, _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    placeholder: firstFieldOption.text,
    options: esFields.reduce(function (esFieldOptions, field) {
      if (_agg_types.aggTypes[watch.aggType].validNormalizedTypes.includes(field.normalizedType)) {
        esFieldOptions.push({
          label: field.name
        });
      }

      return esFieldOptions;
    }, []),
    selectedOptions: watch.aggField ? [{
      label: watch.aggField
    }] : [],
    onChange: function onChange(selectedOptions) {
      setWatchProperty('aggField', selectedOptions.length === 1 ? selectedOptions[0].label : undefined);
      setAggFieldPopoverOpen(false);
    }
  }))))))) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "groupByPopover",
    button: _react.default.createElement(_eui.EuiExpression, {
      description: "".concat(_group_by_types.groupByTypes[watch.groupBy].sizeRequired ? _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.groupedOverLabel', {
        defaultMessage: 'grouped over'
      }) : _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.overLabel', {
        defaultMessage: 'over'
      })),
      value: "".concat(_group_by_types.groupByTypes[watch.groupBy].text, " ").concat(_group_by_types.groupByTypes[watch.groupBy].sizeRequired ? "".concat(watch.termSize || '', " ").concat(watch.termField ? "'".concat(watch.termField, "'") : '') : ''),
      isActive: groupByPopoverOpen || watch.groupBy === 'top' && !(watch.termSize && watch.termField),
      onClick: function onClick() {
        setGroupByPopoverOpen(true);
      },
      color: watch.groupBy === 'all' || watch.termSize && watch.termField ? 'secondary' : 'danger'
    }),
    isOpen: groupByPopoverOpen,
    closePopover: function closePopover() {
      setGroupByPopoverOpen(false);
    },
    ownFocus: true,
    withTitle: true,
    anchorPosition: "downLeft"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiPopoverTitle, null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.overButtonLabel', {
    defaultMessage: 'over'
  })), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    value: watch.groupBy,
    onChange: function onChange(e) {
      setWatchProperty('termSize', null);
      setWatchProperty('termField', null);
      setWatchProperty('groupBy', e.target.value);
    },
    options: Object.values(_group_by_types.groupByTypes).map(function (_ref11) {
      var text = _ref11.text,
          value = _ref11.value;
      return {
        text: text,
        value: value
      };
    })
  })), _group_by_types.groupByTypes[watch.groupBy].sizeRequired ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_components.ErrableFormRow, {
    errorKey: "termSize",
    isShowingErrors: hasErrors,
    errors: errors
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    value: watch.termSize,
    onChange: function onChange(e) {
      setWatchProperty('termSize', e.target.value);
    },
    min: 1
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_components.ErrableFormRow, {
    errorKey: "termField",
    isShowingErrors: hasErrors && watch.termField !== undefined,
    errors: errors
  }, _react.default.createElement(_eui.EuiSelect, {
    value: watch.termField || '',
    onChange: function onChange(e) {
      setWatchProperty('termField', e.target.value);
    },
    options: esFields.reduce(function (options, field) {
      if (_group_by_types.groupByTypes[watch.groupBy].validNormalizedTypes.includes(field.normalizedType)) {
        options.push({
          text: field.name,
          value: field.name
        });
      }

      return options;
    }, [firstFieldOption])
  })))) : null)))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "watchThresholdPopover",
    button: _react.default.createElement(_eui.EuiExpression, {
      "data-test-subj": "watchThresholdButton",
      description: _comparators.comparators[watch.thresholdComparator].text,
      value: watch.threshold.slice(0, _comparators.comparators[watch.thresholdComparator].requiredValues).join(" ".concat(andThresholdText, " ")),
      isActive: Boolean(watchThresholdPopoverOpen || errors.threshold0.length || errors.threshold1 && errors.threshold1.length),
      onClick: function onClick() {
        setWatchThresholdPopoverOpen(true);
      },
      color: errors.threshold0.length || errors.threshold1 && errors.threshold1.length ? 'danger' : 'secondary'
    }),
    isOpen: watchThresholdPopoverOpen,
    closePopover: function closePopover() {
      setWatchThresholdPopoverOpen(false);
    },
    ownFocus: true,
    withTitle: true,
    anchorPosition: "downLeft"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiPopoverTitle, null, _comparators.comparators[watch.thresholdComparator].text), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    value: watch.thresholdComparator,
    onChange: function onChange(e) {
      setWatchProperty('thresholdComparator', e.target.value);
    },
    options: Object.values(_comparators.comparators).map(function (_ref12) {
      var text = _ref12.text,
          value = _ref12.value;
      return {
        text: text,
        value: value
      };
    })
  })), Array.from(Array(_comparators.comparators[watch.thresholdComparator].requiredValues)).map(function (_notUsed, i) {
    return _react.default.createElement(_react.Fragment, {
      key: "threshold".concat(i)
    }, i > 0 ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      className: "watcherThresholdWatchInBetweenComparatorText"
    }, _react.default.createElement(_eui.EuiText, null, andThresholdText), hasErrors && _react.default.createElement(_eui.EuiSpacer, null)) : null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_components.ErrableFormRow, {
      errorKey: "threshold".concat(i),
      isShowingErrors: hasErrors,
      errors: errors
    }, _react.default.createElement(_eui.EuiFieldNumber, {
      "data-test-subj": "watchThresholdInput",
      value: watch.threshold[i] == null ? '' : watch.threshold[i],
      min: 0,
      step: 0.1,
      onChange: function onChange(e) {
        var value = e.target.value;
        var threshold = value !== '' ? parseFloat(value) : value;

        var newThreshold = _toConsumableArray(watch.threshold);

        newThreshold[i] = threshold;
        setWatchProperty('threshold', newThreshold);
      }
    }))));
  }))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "watchDurationPopover",
    button: _react.default.createElement(_eui.EuiExpression, {
      description: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.forTheLastLabel', {
        defaultMessage: 'for the last'
      }),
      value: "".concat(watch.timeWindowSize, " ").concat((0, _get_time_unit_label.getTimeUnitLabel)(watch.timeWindowUnit, parseInt(watch.timeWindowSize, 10).toString())),
      isActive: watchDurationPopoverOpen || !watch.timeWindowSize,
      onClick: function onClick() {
        setWatchDurationPopoverOpen(true);
      },
      color: watch.timeWindowSize ? 'secondary' : 'danger'
    }),
    isOpen: watchDurationPopoverOpen,
    closePopover: function closePopover() {
      setWatchDurationPopoverOpen(false);
    },
    ownFocus: true,
    withTitle: true,
    anchorPosition: "downLeft"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiPopoverTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.threshold.forTheLastButtonLabel",
    defaultMessage: "For the last"
  })), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_components.ErrableFormRow, {
    errorKey: "timeWindowSize",
    isShowingErrors: hasErrors,
    errors: errors
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    min: 1,
    value: watch.timeWindowSize || '',
    onChange: function onChange(e) {
      var value = e.target.value;
      var timeWindowSize = value !== '' ? parseInt(value, 10) : value;
      setWatchProperty('timeWindowSize', timeWindowSize);
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    value: watch.timeWindowUnit,
    onChange: function onChange(e) {
      setWatchProperty('timeWindowUnit', e.target.value);
    },
    options: getTimeOptions(watch.timeWindowSize)
  }))))))), hasExpressionErrors ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiText, {
    color: "danger",
    size: "s"
  }, expressionErrorMessage), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })) : null, hasErrors ? null : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_watch_visualization.WatchVisualization, null), _react.default.createElement(_threshold_watch_action_panel.WatchActionsPanel, {
    actionErrors: actionErrors
  })), _react.default.createElement(_eui.EuiSpacer, null)) : null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    color: "secondary",
    "data-test-subj": "saveWatchButton",
    type: "submit",
    iconType: "check",
    isDisabled: hasErrors || hasActionErrors,
    isLoading: isSaving,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var savedWatch;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              setIsSaving(true);
              _context7.next = 3;
              return (0, _watch_edit_actions.onWatchSave)(watch, toasts);

            case 3:
              savedWatch = _context7.sent;

              if (!(savedWatch && savedWatch.error)) {
                _context7.next = 7;
                break;
              }

              setIsSaving(false);
              return _context7.abrupt("return", setServerError(savedWatch.error));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))
  }, watch.isNew ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.threshold.createButtonLabel",
    defaultMessage: "Create alert"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.threshold.saveButtonLabel",
    defaultMessage: "Save alert"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: function onClick() {
      return (0, _navigation.goToWatchList)();
    }
  }, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.cancelButtonLabel', {
    defaultMessage: 'Cancel'
  }))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: function onClick() {
      return setIsRequestVisible(!isRequestVisible);
    }
  }, isRequestVisible ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.json.hideRequestButtonLabel",
    defaultMessage: "Hide request"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.json.showRequestButtonLabel",
    defaultMessage: "Show request"
  }))))), isRequestVisible ? _react.default.createElement(_request_flyout.RequestFlyout, {
    id: watch.id,
    payload: (0, _serialization.serializeThresholdWatch)(requestPreviewWatchData),
    close: function close() {
      return setIsRequestVisible(false);
    }
  }) : null);
};

exports.ThresholdWatchEdit = ThresholdWatchEdit;