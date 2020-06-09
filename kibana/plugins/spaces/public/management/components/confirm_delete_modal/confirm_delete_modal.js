"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmDeleteModal = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConfirmDeleteModalUI =
/*#__PURE__*/
function (_Component) {
  _inherits(ConfirmDeleteModalUI, _Component);

  function ConfirmDeleteModalUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ConfirmDeleteModalUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ConfirmDeleteModalUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      confirmSpaceName: '',
      error: null,
      deleteInProgress: false,
      isDeletingCurrentSpace: false
    });

    _defineProperty(_assertThisInitialized(_this), "onSpaceNameChange", function (e) {
      if (typeof _this.state.error === 'boolean') {
        _this.setState({
          confirmSpaceName: e.target.value,
          error: e.target.value !== _this.props.space.name
        });
      } else {
        _this.setState({
          confirmSpaceName: e.target.value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirm",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var needsRedirect, spacesManager;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.state.confirmSpaceName === _this.props.space.name)) {
                _context.next = 10;
                break;
              }

              needsRedirect = _this.state.isDeletingCurrentSpace;
              spacesManager = _this.props.spacesManager;

              _this.setState({
                deleteInProgress: true
              });

              _context.next = 6;
              return _this.props.onConfirm();

            case 6:
              _this.setState({
                deleteInProgress: false
              });

              if (needsRedirect) {
                spacesManager.redirectToSpaceSelector();
              }

              _context.next = 11;
              break;

            case 10:
              _this.setState({
                error: true
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    return _this;
  }

  _createClass(ConfirmDeleteModalUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      isCurrentSpace(this.props.space, this.props.spacesManager).then(function (result) {
        _this2.setState({
          isDeletingCurrentSpace: result
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          space = _this$props.space,
          onCancel = _this$props.onCancel,
          intl = _this$props.intl;
      var isDeletingCurrentSpace = this.state.isDeletingCurrentSpace;
      var warning = null;

      if (isDeletingCurrentSpace) {
        var name = _react2.default.createElement("span", null, "(", _react2.default.createElement("strong", null, space.name), ")");

        warning = _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiCallOut, {
          color: "warning"
        }, _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.spaces.management.confirmDeleteModal.redirectAfterDeletingCurrentSpaceWarningMessage",
          defaultMessage: "You are about to delete your current space {name}. You will be redirected to choose a different space if you continue.",
          values: {
            name: name
          }
        }))));
      } // This is largely the same as the built-in EuiConfirmModal component, but we needed the ability
      // to disable the buttons since this could be a long-running operation


      var modalProps = {
        onClose: onCancel,
        className: 'spcConfirmDeleteModal',
        initialFocus: 'input[name="confirmDeleteSpaceInput"]'
      };
      return _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement(_eui.EuiModal, modalProps, _react2.default.createElement(_eui.EuiModalHeader, null, _react2.default.createElement(_eui.EuiModalHeaderTitle, {
        "data-test-subj": "confirmModalTitleText"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.confirmDeleteModal.confirmDeleteSpaceButtonLabel",
        defaultMessage: "Delete space {spaceName}",
        values: {
          spaceName: "'" + space.name + "'"
        }
      }))), _react2.default.createElement(_eui.EuiModalBody, null, _react2.default.createElement(_eui.EuiText, {
        "data-test-subj": "confirmModalBodyText"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.confirmDeleteModal.deletingSpaceWarningMessage",
        defaultMessage: "Deleting a space permanently removes the space and {allContents}. You can't undo this action.",
        values: {
          allContents: _react2.default.createElement("strong", null, _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.spaces.management.confirmDeleteModal.allContentsText",
            defaultMessage: "all of its contents"
          }))
        }
      })), _react2.default.createElement(_eui.EuiFormRow, {
        label: intl.formatMessage({
          id: 'xpack.spaces.management.confirmDeleteModal.confirmSpaceNameFormRowLabel',
          defaultMessage: 'Confirm space name to delete'
        }),
        isInvalid: !!this.state.error,
        error: intl.formatMessage({
          id: 'xpack.spaces.management.confirmDeleteModal.spaceNamesDoNoMatchErrorMessage',
          defaultMessage: 'Space names do not match.'
        })
      }, _react2.default.createElement(_eui.EuiFieldText, {
        name: "confirmDeleteSpaceInput",
        value: this.state.confirmSpaceName,
        onChange: this.onSpaceNameChange,
        disabled: this.state.deleteInProgress
      })), warning)), _react2.default.createElement(_eui.EuiModalFooter, null, _react2.default.createElement(_eui.EuiButtonEmpty, {
        "data-test-subj": "confirmModalCancelButton",
        onClick: onCancel,
        isDisabled: this.state.deleteInProgress
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.confirmDeleteModal.cancelButtonLabel",
        defaultMessage: "Cancel"
      })), _react2.default.createElement(_eui.EuiButton, {
        "data-test-subj": "confirmModalConfirmButton",
        onClick: this.onConfirm,
        fill: true,
        color: 'danger',
        isLoading: this.state.deleteInProgress
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.confirmDeleteModal.deleteSpaceAndAllContentsButtonLabel",
        defaultMessage: " Delete space and all contents"
      })))));
    }
  }]);

  return ConfirmDeleteModalUI;
}(_react2.Component);

function isCurrentSpace(_x, _x2) {
  return _isCurrentSpace.apply(this, arguments);
}

function _isCurrentSpace() {
  _isCurrentSpace = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(space, spacesManager) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = space.id;
            _context2.next = 3;
            return spacesManager.getActiveSpace();

          case 3:
            _context2.t1 = _context2.sent.id;
            return _context2.abrupt("return", _context2.t0 === _context2.t1);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _isCurrentSpace.apply(this, arguments);
}

var ConfirmDeleteModal = (0, _react.injectI18n)(ConfirmDeleteModalUI);
exports.ConfirmDeleteModal = ConfirmDeleteModal;