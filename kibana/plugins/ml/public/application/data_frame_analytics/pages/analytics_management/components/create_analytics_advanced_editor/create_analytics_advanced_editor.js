"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAnalyticsAdvancedEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _custom_hooks = require("../../../../../components/custom_hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var CreateAnalyticsAdvancedEditor = function CreateAnalyticsAdvancedEditor(_ref) {
  var actions = _ref.actions,
      state = _ref.state;
  var setAdvancedEditorRawString = actions.setAdvancedEditorRawString,
      setFormState = actions.setFormState;
  var advancedEditorMessages = state.advancedEditorMessages,
      advancedEditorRawString = state.advancedEditorRawString,
      isJobCreated = state.isJobCreated,
      requestMessages = state.requestMessages;
  var _state$form = state.form,
      createIndexPattern = _state$form.createIndexPattern,
      destinationIndexPatternTitleExists = _state$form.destinationIndexPatternTitleExists,
      jobId = _state$form.jobId,
      jobIdEmpty = _state$form.jobIdEmpty,
      jobIdExists = _state$form.jobIdExists,
      jobIdValid = _state$form.jobIdValid;
  var forceInput = (0, _react.useRef)(null);

  var onChange = function onChange(str) {
    setAdvancedEditorRawString(str);
  }; // Temp effect to close the context menu popover on Clone button click


  (0, _react.useEffect)(function () {
    if (forceInput.current === null) {
      return;
    }

    var evt = document.createEvent('MouseEvents');
    evt.initEvent('mouseup', true, true);
    forceInput.current.dispatchEvent(evt);
  }, []);
  return _react.default.createElement(_eui.EuiForm, {
    className: "mlDataFrameAnalyticsCreateForm"
  }, requestMessages.map(function (requestMessage, i) {
    return _react.default.createElement(_react.Fragment, {
      key: i
    }, _react.default.createElement(_eui.EuiCallOut, {
      title: requestMessage.message,
      color: requestMessage.error !== undefined ? 'danger' : 'primary',
      iconType: requestMessage.error !== undefined ? 'alert' : 'checkInCircleFilled',
      size: "s"
    }, requestMessage.error !== undefined ? _react.default.createElement("p", null, requestMessage.error) : null), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }), !isJobCreated && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditor.jobIdLabel', {
      defaultMessage: 'Analytics job ID'
    }),
    isInvalid: !jobIdEmpty && !jobIdValid || jobIdExists,
    error: [].concat(_toConsumableArray(!jobIdEmpty && !jobIdValid ? [_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditor.jobIdInvalidError', {
      defaultMessage: 'Must contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores only and must start and end with alphanumeric characters.'
    })] : []), _toConsumableArray(jobIdExists ? [_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditor.jobIdExistsError', {
      defaultMessage: 'An analytics job with this ID already exists.'
    })] : []))
  }, _react.default.createElement(_eui.EuiFieldText, {
    inputRef: function inputRef(input) {
      if (input) {
        forceInput.current = input;
      }
    },
    disabled: isJobCreated,
    placeholder: "analytics job ID",
    value: jobId,
    onChange: function onChange(e) {
      return setFormState({
        jobId: e.target.value
      });
    },
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditor.jobIdInputAriaLabel', {
      defaultMessage: 'Choose a unique analytics job ID.'
    }),
    isInvalid: !jobIdEmpty && !jobIdValid || jobIdExists
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditor.configRequestBody', {
      defaultMessage: 'Configuration request body'
    }),
    style: {
      maxWidth: '100%'
    }
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: _custom_hooks.xJsonMode,
    width: "100%",
    value: advancedEditorRawString,
    onChange: onChange,
    setOptions: {
      fontSize: '12px',
      maxLines: 20
    },
    theme: "textmate",
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.advancedEditor.codeEditorAriaLabel', {
      defaultMessage: 'Advanced analytics job editor'
    })
  })), _react.default.createElement(_eui.EuiSpacer, null), advancedEditorMessages.map(function (advancedEditorMessage, i) {
    return _react.default.createElement(_react.Fragment, {
      key: i
    }, _react.default.createElement(_eui.EuiCallOut, {
      title: advancedEditorMessage.message !== '' ? advancedEditorMessage.message : advancedEditorMessage.error,
      color: advancedEditorMessage.error !== undefined ? 'danger' : 'primary',
      iconType: advancedEditorMessage.error !== undefined ? 'alert' : 'checkInCircleFilled',
      size: "s"
    }, advancedEditorMessage.message !== '' && advancedEditorMessage.error !== undefined ? _react.default.createElement("p", null, advancedEditorMessage.error) : null), _react.default.createElement(_eui.EuiSpacer, null));
  }), _react.default.createElement(_eui.EuiFormRow, {
    isInvalid: createIndexPattern && destinationIndexPatternTitleExists,
    error: createIndexPattern && destinationIndexPatternTitleExists && [_i18n.i18n.translate('xpack.ml.dataframe.analytics.create.indexPatternAlreadyExistsError', {
      defaultMessage: 'An index pattern with this title already exists.'
    })]
  }, _react.default.createElement(_eui.EuiSwitch, {
    disabled: isJobCreated,
    name: "mlDataFrameAnalyticsCreateIndexPattern",
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.createIndexPatternLabel', {
      defaultMessage: 'Create index pattern'
    }),
    checked: createIndexPattern === true,
    onChange: function onChange() {
      return setFormState({
        createIndexPattern: !createIndexPattern
      });
    }
  }))));
};

exports.CreateAnalyticsAdvancedEditor = CreateAnalyticsAdvancedEditor;