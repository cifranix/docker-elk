"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultStepDetailsState = getDefaultStepDetailsState;
exports.applyTransformConfigToDetailsState = applyTransformConfigToDetailsState;
exports.StepDetailsForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../../../../src/plugins/data/common");

var _public = require("../../../../../../../../../src/plugins/kibana_react/public");

var _es_utils = require("../../../../../../common/utils/es_utils");

var _shared_imports = require("../../../../../shared_imports");

var _app_dependencies = require("../../../../app_dependencies");

var _components = require("../../../../components");

var _use_documentation_links = require("../../../../hooks/use_documentation_links");

var _use_api = require("../../../../hooks/use_api");

var _common2 = require("../../../../common");

var _validators = require("../../../../common/validators");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDefaultStepDetailsState() {
  return {
    continuousModeDateField: '',
    continuousModeDelay: '60s',
    createIndexPattern: true,
    isContinuousModeEnabled: false,
    transformId: '',
    transformDescription: '',
    destinationIndex: '',
    touched: false,
    valid: false
  };
}

function applyTransformConfigToDetailsState(state, transformConfig) {
  // apply the transform configuration to wizard DETAILS state
  if (transformConfig !== undefined) {
    var _transformConfig$sync;

    var time = (_transformConfig$sync = transformConfig.sync) === null || _transformConfig$sync === void 0 ? void 0 : _transformConfig$sync.time;

    if (time !== undefined) {
      state.continuousModeDateField = time.field;
      state.continuousModeDelay = time.delay;
      state.isContinuousModeEnabled = true;
    }
  }

  return state;
}

var StepDetailsForm = _react.default.memo(function (_ref) {
  var _ref$overrides = _ref.overrides,
      overrides = _ref$overrides === void 0 ? {} : _ref$overrides,
      onChange = _ref.onChange,
      searchItems = _ref.searchItems;
  var deps = (0, _app_dependencies.useAppDependencies)();
  var toastNotifications = (0, _app_dependencies.useToastNotifications)();

  var _useDocumentationLink = (0, _use_documentation_links.useDocumentationLinks)(),
      esIndicesCreateIndex = _useDocumentationLink.esIndicesCreateIndex;

  var defaults = _objectSpread({}, getDefaultStepDetailsState(), {}, overrides);

  var _useState = (0, _react.useState)(defaults.transformId),
      _useState2 = _slicedToArray(_useState, 2),
      transformId = _useState2[0],
      setTransformId = _useState2[1];

  var _useState3 = (0, _react.useState)(defaults.transformDescription),
      _useState4 = _slicedToArray(_useState3, 2),
      transformDescription = _useState4[0],
      setTransformDescription = _useState4[1];

  var _useState5 = (0, _react.useState)(defaults.destinationIndex),
      _useState6 = _slicedToArray(_useState5, 2),
      destinationIndex = _useState6[0],
      setDestinationIndex = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      transformIds = _useState8[0],
      setTransformIds = _useState8[1];

  var _useState9 = (0, _react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      indexNames = _useState10[0],
      setIndexNames = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      indexPatternTitles = _useState12[0],
      setIndexPatternTitles = _useState12[1];

  var _useState13 = (0, _react.useState)(defaults.createIndexPattern),
      _useState14 = _slicedToArray(_useState13, 2),
      createIndexPattern = _useState14[0],
      setCreateIndexPattern = _useState14[1]; // Continuous mode state


  var _useState15 = (0, _react.useState)(defaults.isContinuousModeEnabled),
      _useState16 = _slicedToArray(_useState15, 2),
      isContinuousModeEnabled = _useState16[0],
      setContinuousModeEnabled = _useState16[1];

  var api = (0, _use_api.useApi)(); // fetch existing transform IDs and indices once for form validation

  (0, _react.useEffect)(function () {
    // use an IIFE to avoid returning a Promise to useEffect.
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.t0 = setTransformIds;
              _context.next = 4;
              return api.getTransforms();

            case 4:
              _context.t1 = function (transform) {
                return transform.id;
              };

              _context.t2 = _context.sent.transforms.map(_context.t1);
              (0, _context.t0)(_context.t2);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t3 = _context["catch"](0);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.transform.stepDetailsForm.errorGettingTransformList', {
                  defaultMessage: 'An error occurred getting the existing transform IDs:'
                }),
                text: (0, _public.toMountPoint)(_react.default.createElement(_components.ToastNotificationText, {
                  overlays: deps.overlays,
                  text: (0, _shared_imports.getErrorMessage)(_context.t3)
                }))
              });

            case 12:
              _context.prev = 12;
              _context.t4 = setIndexNames;
              _context.next = 16;
              return api.getIndices();

            case 16:
              _context.t5 = function (index) {
                return index.name;
              };

              _context.t6 = _context.sent.map(_context.t5);
              (0, _context.t4)(_context.t6);
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t7 = _context["catch"](12);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.transform.stepDetailsForm.errorGettingIndexNames', {
                  defaultMessage: 'An error occurred getting the existing index names:'
                }),
                text: (0, _public.toMountPoint)(_react.default.createElement(_components.ToastNotificationText, {
                  overlays: deps.overlays,
                  text: (0, _shared_imports.getErrorMessage)(_context.t7)
                }))
              });

            case 24:
              _context.prev = 24;
              _context.t8 = setIndexPatternTitles;
              _context.next = 28;
              return deps.data.indexPatterns.getTitles();

            case 28:
              _context.t9 = _context.sent;
              (0, _context.t8)(_context.t9);
              _context.next = 35;
              break;

            case 32:
              _context.prev = 32;
              _context.t10 = _context["catch"](24);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.transform.stepDetailsForm.errorGettingIndexPatternTitles', {
                  defaultMessage: 'An error occurred getting the existing index pattern titles:'
                }),
                text: (0, _public.toMountPoint)(_react.default.createElement(_components.ToastNotificationText, {
                  overlays: deps.overlays,
                  text: (0, _shared_imports.getErrorMessage)(_context.t10)
                }))
              });

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9], [12, 21], [24, 32]]);
    }))(); // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  var dateFieldNames = searchItems.indexPattern.fields.filter(function (f) {
    return f.type === _common.KBN_FIELD_TYPES.DATE;
  }).map(function (f) {
    return f.name;
  }).sort();
  var isContinuousModeAvailable = dateFieldNames.length > 0;

  var _useState17 = (0, _react.useState)(isContinuousModeAvailable ? dateFieldNames[0] : ''),
      _useState18 = _slicedToArray(_useState17, 2),
      continuousModeDateField = _useState18[0],
      setContinuousModeDateField = _useState18[1];

  var _useState19 = (0, _react.useState)(defaults.continuousModeDelay),
      _useState20 = _slicedToArray(_useState19, 2),
      continuousModeDelay = _useState20[0],
      setContinuousModeDelay = _useState20[1];

  var isContinuousModeDelayValid = (0, _validators.delayValidator)(continuousModeDelay);
  var transformIdExists = transformIds.some(function (id) {
    return transformId === id;
  });
  var transformIdEmpty = transformId === '';
  var transformIdValid = (0, _common2.isTransformIdValid)(transformId);
  var indexNameExists = indexNames.some(function (name) {
    return destinationIndex === name;
  });
  var indexNameEmpty = destinationIndex === '';
  var indexNameValid = (0, _es_utils.isValidIndexName)(destinationIndex);
  var indexPatternTitleExists = indexPatternTitles.some(function (name) {
    return destinationIndex === name;
  });
  var valid = !transformIdEmpty && transformIdValid && !transformIdExists && !indexNameEmpty && indexNameValid && (!indexPatternTitleExists || !createIndexPattern) && (!isContinuousModeAvailable || isContinuousModeAvailable && isContinuousModeDelayValid); // expose state to wizard

  (0, _react.useEffect)(function () {
    onChange({
      continuousModeDateField: continuousModeDateField,
      continuousModeDelay: continuousModeDelay,
      createIndexPattern: createIndexPattern,
      isContinuousModeEnabled: isContinuousModeEnabled,
      transformId: transformId,
      transformDescription: transformDescription,
      destinationIndex: destinationIndex,
      touched: true,
      valid: valid
    }); // custom comparison

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [continuousModeDateField, continuousModeDelay, createIndexPattern, isContinuousModeEnabled, transformId, transformDescription, destinationIndex, valid]);
  return _react.default.createElement("div", {
    "data-test-subj": "transformStepDetailsForm"
  }, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDetailsForm.transformIdLabel', {
      defaultMessage: 'Transform ID'
    }),
    isInvalid: !transformIdEmpty && !transformIdValid || transformIdExists,
    error: [].concat(_toConsumableArray(!transformIdEmpty && !transformIdValid ? [_i18n.i18n.translate('xpack.transform.stepDetailsForm.transformIdInvalidError', {
      defaultMessage: 'Must contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores only and must start and end with alphanumeric characters.'
    })] : []), _toConsumableArray(transformIdExists ? [_i18n.i18n.translate('xpack.transform.stepDetailsForm.transformIdExistsError', {
      defaultMessage: 'A transform with this ID already exists.'
    })] : []))
  }, _react.default.createElement(_eui.EuiFieldText, {
    placeholder: "transform ID",
    value: transformId,
    onChange: function onChange(e) {
      return setTransformId(e.target.value);
    },
    "aria-label": _i18n.i18n.translate('xpack.transform.stepDetailsForm.transformIdInputAriaLabel', {
      defaultMessage: 'Choose a unique transform ID.'
    }),
    isInvalid: !transformIdEmpty && !transformIdValid || transformIdExists,
    "data-test-subj": "transformIdInput"
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDetailsForm.transformDescriptionLabel', {
      defaultMessage: 'Transform description'
    }),
    helpText: _i18n.i18n.translate('xpack.transform.stepDetailsForm.transformDescriptionHelpText', {
      defaultMessage: 'Optional descriptive text.'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    placeholder: "transform description",
    value: transformDescription,
    onChange: function onChange(e) {
      return setTransformDescription(e.target.value);
    },
    "aria-label": _i18n.i18n.translate('xpack.transform.stepDetailsForm.transformDescriptionInputAriaLabel', {
      defaultMessage: 'Choose an optional transform description.'
    }),
    "data-test-subj": "transformDescriptionInput"
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDetailsForm.destinationIndexLabel', {
      defaultMessage: 'Destination index'
    }),
    isInvalid: !indexNameEmpty && !indexNameValid,
    helpText: indexNameExists && _i18n.i18n.translate('xpack.transform.stepDetailsForm.destinationIndexHelpText', {
      defaultMessage: 'An index with this name already exists. Be aware that running this transform will modify this destination index.'
    }),
    error: !indexNameEmpty && !indexNameValid && [_react.default.createElement(_react.Fragment, null, _i18n.i18n.translate('xpack.transform.stepDetailsForm.destinationIndexInvalidError', {
      defaultMessage: 'Invalid destination index name.'
    }), _react.default.createElement("br", null), _react.default.createElement(_eui.EuiLink, {
      href: esIndicesCreateIndex,
      target: "_blank"
    }, _i18n.i18n.translate('xpack.transform.stepDetailsForm.destinationIndexInvalidErrorLink', {
      defaultMessage: 'Learn more about index name limitations.'
    })))]
  }, _react.default.createElement(_eui.EuiFieldText, {
    placeholder: "destination index",
    value: destinationIndex,
    onChange: function onChange(e) {
      return setDestinationIndex(e.target.value);
    },
    "aria-label": _i18n.i18n.translate('xpack.transform.stepDetailsForm.destinationIndexInputAriaLabel', {
      defaultMessage: 'Choose a unique destination index name.'
    }),
    isInvalid: !indexNameEmpty && !indexNameValid,
    "data-test-subj": "transformDestinationIndexInput"
  })), _react.default.createElement(_eui.EuiFormRow, {
    isInvalid: createIndexPattern && indexPatternTitleExists,
    error: createIndexPattern && indexPatternTitleExists && [_i18n.i18n.translate('xpack.transform.stepDetailsForm.indexPatternTitleError', {
      defaultMessage: 'An index pattern with this title already exists.'
    })]
  }, _react.default.createElement(_eui.EuiSwitch, {
    name: "transformCreateIndexPattern",
    label: _i18n.i18n.translate('xpack.transform.stepCreateForm.createIndexPatternLabel', {
      defaultMessage: 'Create index pattern'
    }),
    checked: createIndexPattern === true,
    onChange: function onChange() {
      return setCreateIndexPattern(!createIndexPattern);
    },
    "data-test-subj": "transformCreateIndexPatternSwitch"
  })), _react.default.createElement(_eui.EuiFormRow, {
    helpText: isContinuousModeAvailable === false ? _i18n.i18n.translate('xpack.transform.stepDetailsForm.continuousModeError', {
      defaultMessage: 'Continuous mode is not available for indices without date fields.'
    }) : ''
  }, _react.default.createElement(_eui.EuiSwitch, {
    name: "transformContinuousMode",
    label: _i18n.i18n.translate('xpack.transform.stepCreateForm.continuousModeLabel', {
      defaultMessage: 'Continuous mode'
    }),
    checked: isContinuousModeEnabled === true,
    onChange: function onChange() {
      return setContinuousModeEnabled(!isContinuousModeEnabled);
    },
    disabled: isContinuousModeAvailable === false,
    "data-test-subj": "transformContinuousModeSwitch"
  })), isContinuousModeEnabled && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDetailsForm.continuousModeDateFieldLabel', {
      defaultMessage: 'Date field'
    }),
    helpText: _i18n.i18n.translate('xpack.transform.stepDetailsForm.continuousModeDateFieldHelpText', {
      defaultMessage: 'Select the date field that can be used to identify new documents.'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    options: dateFieldNames.map(function (text) {
      return {
        text: text
      };
    }),
    value: continuousModeDateField,
    onChange: function onChange(e) {
      return setContinuousModeDateField(e.target.value);
    },
    "data-test-subj": "transformContinuousDateFieldSelect"
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDetailsForm.continuousModeDelayLabel', {
      defaultMessage: 'Delay'
    }),
    isInvalid: !isContinuousModeDelayValid,
    error: !isContinuousModeDelayValid && [_i18n.i18n.translate('xpack.transform.stepDetailsForm.continuousModeDelayError', {
      defaultMessage: 'Invalid delay format'
    })],
    helpText: _i18n.i18n.translate('xpack.transform.stepDetailsForm.continuousModeDelayHelpText', {
      defaultMessage: 'Time delay between current time and latest input data time.'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    placeholder: "delay",
    value: continuousModeDelay,
    onChange: function onChange(e) {
      return setContinuousModeDelay(e.target.value);
    },
    "aria-label": _i18n.i18n.translate('xpack.transform.stepDetailsForm.continuousModeAriaLabel', {
      defaultMessage: 'Choose a delay.'
    }),
    isInvalid: !isContinuousModeDelayValid,
    "data-test-subj": "transformContinuousDelayInput"
  })))));
});

exports.StepDetailsForm = StepDetailsForm;