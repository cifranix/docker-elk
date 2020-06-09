"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadMappingsProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../shared_imports");

var _lib = require("../../lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MAX_ERRORS_TO_DISPLAY = 1;

var getTexts = function getTexts(view) {
  var totalErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return {
    modalTitle: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.loadJsonModalTitle', {
      defaultMessage: 'Load JSON'
    }),
    buttons: {
      confirm: view === 'json' ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.loadJsonModal.loadButtonLabel', {
        defaultMessage: 'Load and overwrite'
      }) : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.loadJsonModal.acceptWarningLabel', {
        defaultMessage: 'Continue loading'
      }),
      cancel: view === 'json' ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.loadJsonModal.cancelButtonLabel', {
        defaultMessage: 'Cancel'
      }) : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.loadJsonModal.goBackButtonLabel', {
        defaultMessage: 'Go back'
      })
    },
    editor: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.loadJsonModal.jsonEditorLabel', {
        defaultMessage: 'Mappings object'
      })
    },
    validationErrors: {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.loadJsonModal.validationErrorTitle",
        defaultMessage: "{totalErrors} {totalErrors, plural, one {invalid option} other {invalid options}} detected in {mappings} object",
        values: {
          totalErrors: totalErrors,
          // NOTE: This doesn't need internationalization because it's part of the ES API.
          mappings: _react.default.createElement("code", null, "mappings")
        }
      }),
      description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.loadJsonModal.validationErrorDescription', {
        defaultMessage: 'If you continue loading the object, only valid options will be accepted.'
      })
    }
  };
};

var getErrorMessage = function getErrorMessage(error) {
  switch (error.code) {
    case 'ERR_CONFIG':
      {
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.idxMgmt.mappingsEditor.loadJsonModal.validationError.configurationMessage",
          defaultMessage: "The {configName} configuration is invalid.",
          values: {
            configName: _react.default.createElement("code", null, error.configName)
          }
        });
      }

    case 'ERR_FIELD':
      {
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.idxMgmt.mappingsEditor.loadJsonModal.validationError.fieldMessage",
          defaultMessage: "The {fieldPath} field is invalid.",
          values: {
            fieldPath: _react.default.createElement("code", null, error.fieldPath)
          }
        });
      }

    case 'ERR_PARAMETER':
      {
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.idxMgmt.mappingsEditor.loadJsonModal.validationError.parameterMessage",
          defaultMessage: "The {paramName} parameter on field {fieldPath} is invalid.",
          values: {
            paramName: _react.default.createElement("code", null, error.paramName),
            fieldPath: _react.default.createElement("code", null, error.fieldPath)
          }
        });
      }
  }
};

var areAllObjectKeysValidParameters = function areAllObjectKeysValidParameters(obj) {
  return Object.keys(obj).every(function (key) {
    return _lib.VALID_MAPPINGS_PARAMETERS.includes(key);
  });
};

var LoadMappingsProvider = function LoadMappingsProvider(_ref) {
  var _state$errors, _state$json;

  var onJson = _ref.onJson,
      children = _ref.children;

  var _useState = (0, _react.useState)({
    isModalOpen: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = (0, _react.useState)(MAX_ERRORS_TO_DISPLAY),
      _useState4 = _slicedToArray(_useState3, 2),
      totalErrorsToDisplay = _useState4[0],
      setTotalErrorsToDisplay = _useState4[1];

  var jsonContent = (0, _react.useRef)(undefined);
  var view = state.json !== undefined && state.errors !== undefined ? 'validationResult' : 'json';
  var i18nTexts = getTexts(view, (_state$errors = state.errors) === null || _state$errors === void 0 ? void 0 : _state$errors.length);

  var onJsonUpdate = function onJsonUpdate(jsonUpdateData) {
    jsonContent.current = jsonUpdateData;
  };

  var openModal = function openModal() {
    setState({
      isModalOpen: true
    });
  };

  var closeModal = function closeModal() {
    setState({
      isModalOpen: false
    });
  };

  var getMappingsMetadata = function getMappingsMetadata(unparsed) {
    var hasCustomType = false;
    var isMultiTypeMappings = false;
    var customType;
    /**
     * We need to check if there are single or multi-types mappings declared, for that we will check for the following:
     *
     * - Are **all** root level keys valid parameter for the mappings definition. If not, and all keys are plain object, we assume we have multi-type mappings
     * - If there are more than two types, return "as is" as the UI does not support more than 1 type and will display a warning callout
     * - If there is only 1 type, validate the mappings definition and return it wrapped inside the the custom type
     */

    var areAllKeysValid = areAllObjectKeysValidParameters(unparsed);
    var areAllValuesPlainObjects = Object.values(unparsed).every(_lodash.isPlainObject);
    var areAllValuesObjKeysValidParameterName = areAllValuesPlainObjects && Object.values(unparsed).every(areAllObjectKeysValidParameters);

    if (!areAllKeysValid && areAllValuesPlainObjects) {
      hasCustomType = true;
      isMultiTypeMappings = Object.keys(unparsed).length > 1;
    } // If all root level keys are *valid* parameters BUT they are all plain objects which *also* have ALL valid mappings config parameter
    // we can assume that they are custom types whose name matches a mappings configuration parameter.
    // This is to handle the case where a custom type would be for example "dynamic" which is a mappings configuration parameter.
    else if (areAllKeysValid && areAllValuesPlainObjects && areAllValuesObjKeysValidParameterName) {
        hasCustomType = true;
        isMultiTypeMappings = Object.keys(unparsed).length > 1;
      }

    if (hasCustomType && !isMultiTypeMappings) {
      customType = Object.keys(unparsed)[0];
    }

    return {
      isMultiTypeMappings: isMultiTypeMappings,
      customType: customType
    };
  };

  var loadJson = function loadJson() {
    if (jsonContent.current === undefined) {
      // No changes have been made in the JSON, this is probably a "reset()" for the user
      onJson({});
      closeModal();
      return;
    }

    var isValidJson = jsonContent.current.validate();

    if (isValidJson) {
      // Parse and validate the JSON to make sure it won't break the UI
      var unparsed = jsonContent.current.data.format();

      if (Object.keys(unparsed).length === 0) {
        // Empty object...exit early
        onJson(unparsed);
        closeModal();
        return;
      }

      var mappingsToValidate = unparsed;

      var _getMappingsMetadata = getMappingsMetadata(unparsed),
          isMultiTypeMappings = _getMappingsMetadata.isMultiTypeMappings,
          customType = _getMappingsMetadata.customType;

      if (isMultiTypeMappings) {
        // Exit early, the UI will show a warning
        onJson(unparsed);
        closeModal();
        return;
      } // Custom type can't be "properties", ES will not treat it as such
      // as it is reserved for fields definition


      if (customType !== undefined && customType !== 'properties') {
        mappingsToValidate = unparsed[customType];
      }

      var _validateMappings = (0, _lib.validateMappings)(mappingsToValidate),
          parsed = _validateMappings.value,
          errors = _validateMappings.errors; // Wrap the mappings definition with custom type if one was provided.


      var parsedWithType = customType !== undefined ? _defineProperty({}, customType, parsed) : parsed;

      if (errors) {
        setState({
          isModalOpen: true,
          json: {
            unparsed: unparsed,
            parsed: parsedWithType
          },
          errors: errors
        });
        return;
      }

      onJson(parsedWithType);
      closeModal();
    }
  };

  var onConfirm = function onConfirm() {
    if (view === 'json') {
      loadJson();
    } else {
      // We have some JSON and we agree on the error
      onJson(state.json.parsed);
      closeModal();
    }
  };

  var onCancel = function onCancel() {
    if (view === 'json') {
      // Cancel...
      closeModal();
    } else {
      // Go back to the JSON editor to correct the errors.
      setState({
        isModalOpen: true,
        json: state.json
      });
    }
  };

  var renderErrorsFilterButton = function renderErrorsFilterButton() {
    var showingAllErrors = totalErrorsToDisplay > MAX_ERRORS_TO_DISPLAY;
    return _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: function onClick() {
        return setTotalErrorsToDisplay(showingAllErrors ? MAX_ERRORS_TO_DISPLAY : state.errors.length);
      },
      iconType: showingAllErrors ? 'arrowUp' : 'arrowDown'
    }, showingAllErrors ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.hideErrorsButtonLabel', {
      defaultMessage: 'Hide errors'
    }) : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.showAllErrorsButtonLabel', {
      defaultMessage: 'Show {numErrors} more errors',
      values: {
        numErrors: state.errors.length - MAX_ERRORS_TO_DISPLAY
      }
    }));
  };

  return _react.default.createElement(_react.default.Fragment, null, children(openModal), state.isModalOpen && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: i18nTexts.modalTitle,
    onCancel: onCancel,
    onConfirm: onConfirm,
    cancelButtonText: i18nTexts.buttons.cancel,
    confirmButtonText: i18nTexts.buttons.confirm,
    maxWidth: 600
  }, view === 'json' ? // The CSS override for the EuiCodeEditor requires a parent .application css class
  _react.default.createElement("div", {
    className: "application"
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.mappingsEditor.loadJsonModal.jsonEditorHelpText",
    defaultMessage: "Provide a mappings object, for example, the object assigned to an index {mappings} property. This will overwrite existing mappings, dynamic templates, and options.",
    values: {
      mappings: _react.default.createElement("code", null, "mappings")
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_shared_imports.JsonEditor, {
    label: i18nTexts.editor.label,
    onUpdate: onJsonUpdate,
    defaultValue: (_state$json = state.json) === null || _state$json === void 0 ? void 0 : _state$json.unparsed,
    euiCodeEditorProps: {
      height: '450px'
    }
  })) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: i18nTexts.validationErrors.title,
    iconType: "alert",
    color: "warning"
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, i18nTexts.validationErrors.description)), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement("ol", null, state.errors.slice(0, totalErrorsToDisplay).map(function (error, i) {
    return _react.default.createElement("li", {
      key: i
    }, getErrorMessage(error));
  })), state.errors.length > MAX_ERRORS_TO_DISPLAY && renderErrorsFilterButton())))));
};

exports.LoadMappingsProvider = LoadMappingsProvider;