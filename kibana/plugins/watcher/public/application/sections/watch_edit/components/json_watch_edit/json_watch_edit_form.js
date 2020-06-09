"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonWatchEditForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _serialization = require("../../../../../../common/lib/serialization");

var _components = require("../../../../components");

var _watch_edit_actions = require("../../watch_edit_actions");

var _watch_context = require("../../watch_context");

var _navigation = require("../../../../lib/navigation");

var _request_flyout = require("../request_flyout");

var _app_context = require("../../../../app_context");

var _use_x_json_mode = require("./use_x_json_mode");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JsonWatchEditForm = function JsonWatchEditForm() {
  var _useAppContext = (0, _app_context.useAppContext)(),
      putWatchApiUrl = _useAppContext.links.putWatchApiUrl,
      toasts = _useAppContext.toasts;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch,
      setWatchProperty = _useContext.setWatchProperty;

  var _useXJsonMode = (0, _use_x_json_mode.useXJsonMode)(watch.watchString),
      xJsonMode = _useXJsonMode.xJsonMode,
      convertToJson = _useXJsonMode.convertToJson,
      setXJson = _useXJsonMode.setXJson,
      xJson = _useXJsonMode.xJson;

  var _watch$validate = watch.validate(),
      errors = _watch$validate.errors;

  var hasErrors = !!Object.keys(errors).find(function (errorKey) {
    return errors[errorKey].length >= 1;
  });

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      validationError = _useState2[0],
      setValidationError = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isRequestVisible = _useState4[0],
      setIsRequestVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      serverError = _useState6[0],
      setServerError = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isSaving = _useState8[0],
      setIsSaving = _useState8[1];

  var hasActionErrors = !!validationError;

  var invalidActionMessage = _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.form.actionValidationErrorMessage', {
    defaultMessage: 'Invalid watch actions'
  });

  var jsonErrors = _objectSpread({}, errors, {
    json: hasActionErrors ? [].concat(_toConsumableArray(errors.json), [invalidActionMessage]) : _toConsumableArray(errors.json)
  });

  if (errors.json.length === 0) {
    setWatchProperty('watch', JSON.parse(watch.watchString));
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiForm, {
    isInvalid: hasActionErrors,
    error: validationError ? validationError : [],
    "data-test-subj": "jsonWatchForm"
  }, serverError && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_components.SectionError, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.json.saveWatchErrorTitle",
      defaultMessage: "Error saving watch"
    }),
    error: serverError,
    "data-test-subj": "sectionError"
  }), _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiFormRow, {
    id: "watchName",
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.form.watchNameLabel', {
      defaultMessage: 'Name (optional)'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    id: "watchName",
    name: "name",
    value: watch.name || '',
    "data-test-subj": "nameInput",
    onChange: function onChange(e) {
      var watchName = e.target.value;
      setWatchProperty('name', watchName);
    },
    onBlur: function onBlur() {
      if (!watch.name) {
        setWatchProperty('name', '');
      }
    }
  })), _react.default.createElement(_components.ErrableFormRow, {
    id: "watchId",
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.form.watchIDLabel', {
      defaultMessage: 'ID'
    }),
    errorKey: "id",
    isShowingErrors: hasErrors && watch.id !== undefined,
    errors: errors
  }, _react.default.createElement(_eui.EuiFieldText, {
    id: "id",
    name: "id",
    "data-test-subj": "idInput",
    value: watch.id || '',
    readOnly: !watch.isNew,
    onChange: function onChange(e) {
      setWatchProperty('id', e.target.value);
    },
    onBlur: function onBlur() {
      if (!watch.id) {
        setWatchProperty('id', '');
      }
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_components.ErrableFormRow, {
    id: "watchJson",
    label: _react.default.createElement(_react.Fragment, null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.form.watchJsonLabel', {
      defaultMessage: 'Watch JSON'
    }), ' ', "(", _react.default.createElement(_eui.EuiLink, {
      href: putWatchApiUrl,
      target: "_blank"
    }, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.form.watchJsonDocLink', {
      defaultMessage: 'API syntax'
    })), ")"),
    errorKey: "json",
    isShowingErrors: hasErrors || hasActionErrors,
    fullWidth: true,
    errors: jsonErrors
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: xJsonMode,
    width: "100%",
    theme: "textmate",
    "data-test-subj": "jsonEditor",
    "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.form.watchJsonAriaLabel', {
      defaultMessage: 'Code editor'
    }),
    value: xJson,
    onChange: function onChange(xjson) {
      if (validationError) {
        setValidationError(null);
      }

      setXJson(xjson); // Keep the watch in sync with the editor content

      setWatchProperty('watchString', convertToJson(xjson));
    }
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "saveWatchButton",
    fill: true,
    color: "secondary",
    type: "submit",
    iconType: "check",
    isLoading: isSaving,
    isDisabled: hasErrors,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var savedWatch, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsSaving(true);
              _context.next = 3;
              return (0, _watch_edit_actions.onWatchSave)(watch, toasts);

            case 3:
              savedWatch = _context.sent;

              if (!(savedWatch && savedWatch.error)) {
                _context.next = 10;
                break;
              }

              data = savedWatch.error.data;
              setIsSaving(false);

              if (!(data && data.error === 'validation')) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", setValidationError(data.message));

            case 9:
              return _context.abrupt("return", setServerError(savedWatch.error));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }, watch.isNew ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.json.createButtonLabel",
    defaultMessage: "Create watch"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.json.saveButtonLabel",
    defaultMessage: "Save watch"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "btnCancelWatch",
    onClick: function onClick() {
      return (0, _navigation.goToWatchList)();
    }
  }, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.cancelButtonLabel', {
    defaultMessage: 'Cancel'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
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
    payload: (0, _serialization.serializeJsonWatch)(watch.name, watch.watch),
    close: function close() {
      return setIsRequestVisible(false);
    }
  }) : null);
};

exports.JsonWatchEditForm = JsonWatchEditForm;