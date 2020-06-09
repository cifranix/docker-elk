"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationFlyout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _annotations = require("../../../../../common/constants/annotations");

var _annotations_service = require("../../../services/annotations_service");

var _annotation_description_list = require("../annotation_description_list");

var _delete_annotation_modal = require("../delete_annotation_modal");

var _ml_api_service = require("../../../services/ml_api_service");

var _dependency_cache = require("../../../util/dependency_cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AnnotationFlyoutUI =
/*#__PURE__*/
function (_Component) {
  _inherits(AnnotationFlyoutUI, _Component);

  function AnnotationFlyoutUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnnotationFlyoutUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnnotationFlyoutUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isDeleteModalVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "annotationSub", null);

    _defineProperty(_assertThisInitialized(_this), "annotationTextChangeHandler", function (e) {
      if (_this.props.annotation === null) {
        return;
      }

      _annotations_service.annotation$.next(_objectSpread({}, _this.props.annotation, {
        annotation: e.target.value
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "cancelEditingHandler", function () {
      _annotations_service.annotation$.next(null);
    });

    _defineProperty(_assertThisInitialized(_this), "deleteConfirmHandler", function () {
      _this.setState({
        isDeleteModalVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteHandler",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var annotation, toastNotifications;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              annotation = _this.props.annotation;
              toastNotifications = (0, _dependency_cache.getToastNotifications)();

              if (!(annotation === null || annotation._id === undefined)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              _context.prev = 4;
              _context.next = 7;
              return _ml_api_service.ml.annotations.deleteAnnotation(annotation._id);

            case 7:
              toastNotifications.addSuccess(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.timeSeriesChart.deletedAnnotationNotificationMessage', {
                defaultMessage: 'Deleted annotation for job with ID {jobId}.',
                values: {
                  jobId: annotation.job_id
                }
              }));
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);
              toastNotifications.addDanger(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.timeSeriesChart.errorWithDeletingAnnotationNotificationErrorMessage', {
                defaultMessage: 'An error occurred deleting the annotation for job with ID {jobId}: {error}',
                values: {
                  jobId: annotation.job_id,
                  error: JSON.stringify(_context.t0)
                }
              }));

            case 13:
              _this.closeDeleteModal();

              _annotations_service.annotation$.next(null);

              (0, _annotations_service.annotationsRefreshed)();

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 10]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "closeDeleteModal", function () {
      _this.setState({
        isDeleteModalVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "validateAnnotationText", function () {
      // Validates the entered text, returning an array of error messages
      // for display in the form. An empty array is returned if the text is valid.
      var annotation = _this.props.annotation;
      var errors = [];

      if (annotation === null) {
        return errors;
      }

      if (annotation.annotation.trim().length === 0) {
        errors.push(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationFlyout.noAnnotationTextError', {
          defaultMessage: 'Enter annotation text'
        }));
      }

      var textLength = annotation.annotation.length;

      if (textLength > _annotations.ANNOTATION_MAX_LENGTH_CHARS) {
        var charsOver = textLength - _annotations.ANNOTATION_MAX_LENGTH_CHARS;
        errors.push(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationFlyout.maxLengthError', {
          defaultMessage: '{charsOver, number} {charsOver, plural, one {character} other {characters}} above maximum length of {maxChars}',
          values: {
            maxChars: _annotations.ANNOTATION_MAX_LENGTH_CHARS,
            charsOver: charsOver
          }
        }));
      }

      return errors;
    });

    _defineProperty(_assertThisInitialized(_this), "saveOrUpdateAnnotation", function () {
      var annotation = _this.props.annotation;

      if (annotation === null) {
        return;
      }

      _annotations_service.annotation$.next(null);

      _ml_api_service.ml.annotations.indexAnnotation(annotation).then(function () {
        (0, _annotations_service.annotationsRefreshed)();
        var toastNotifications = (0, _dependency_cache.getToastNotifications)();

        if (typeof annotation._id === 'undefined') {
          toastNotifications.addSuccess(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.timeSeriesChart.addedAnnotationNotificationMessage', {
            defaultMessage: 'Added an annotation for job with ID {jobId}.',
            values: {
              jobId: annotation.job_id
            }
          }));
        } else {
          toastNotifications.addSuccess(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.timeSeriesChart.updatedAnnotationNotificationMessage', {
            defaultMessage: 'Updated annotation for job with ID {jobId}.',
            values: {
              jobId: annotation.job_id
            }
          }));
        }
      }).catch(function (resp) {
        var toastNotifications = (0, _dependency_cache.getToastNotifications)();

        if (typeof annotation._id === 'undefined') {
          toastNotifications.addDanger(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.timeSeriesChart.errorWithCreatingAnnotationNotificationErrorMessage', {
            defaultMessage: 'An error occurred creating the annotation for job with ID {jobId}: {error}',
            values: {
              jobId: annotation.job_id,
              error: JSON.stringify(resp)
            }
          }));
        } else {
          toastNotifications.addDanger(_i18n.i18n.translate('xpack.ml.timeSeriesExplorer.timeSeriesChart.errorWithUpdatingAnnotationNotificationErrorMessage', {
            defaultMessage: 'An error occurred updating the annotation for job with ID {jobId}: {error}',
            values: {
              jobId: annotation.job_id,
              error: JSON.stringify(resp)
            }
          }));
        }
      });
    });

    return _this;
  }

  _createClass(AnnotationFlyoutUI, [{
    key: "render",
    value: function render() {
      var annotation = this.props.annotation;
      var isDeleteModalVisible = this.state.isDeleteModalVisible;

      if (annotation === null) {
        return null;
      }

      var isExistingAnnotation = typeof annotation._id !== 'undefined'; // Check the length of the text is within the max length limit,
      // and warn if the length is approaching the limit.

      var validationErrors = this.validateAnnotationText();
      var isInvalid = validationErrors.length > 0;
      var lengthRatioToShowWarning = 0.95;
      var helpText = null;

      if (isInvalid === false && annotation.annotation.length > _annotations.ANNOTATION_MAX_LENGTH_CHARS * lengthRatioToShowWarning) {
        helpText = _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.annotationFlyout.approachingMaxLengthWarning', {
          defaultMessage: '{charsRemaining, number} {charsRemaining, plural, one {character} other {characters}} remaining',
          values: {
            charsRemaining: _annotations.ANNOTATION_MAX_LENGTH_CHARS - annotation.annotation.length
          }
        });
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlyout, {
        onClose: this.cancelEditingHandler,
        size: "s",
        "aria-labelledby": "Add annotation"
      }, _react.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h2", {
        id: "mlAnnotationFlyoutTitle"
      }, isExistingAnnotation ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.timeSeriesExplorer.annotationFlyout.editAnnotationTitle",
        defaultMessage: "Edit annotation"
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.timeSeriesExplorer.annotationFlyout.addAnnotationTitle",
        defaultMessage: "Add annotation"
      })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_annotation_description_list.AnnotationDescriptionList, {
        annotation: annotation
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_eui.EuiFormRow, {
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.ml.timeSeriesExplorer.annotationFlyout.annotationTextLabel",
          defaultMessage: "Annotation text"
        }),
        fullWidth: true,
        helpText: helpText,
        isInvalid: isInvalid,
        error: validationErrors
      }, _react.default.createElement(_eui.EuiTextArea, {
        fullWidth: true,
        isInvalid: isInvalid,
        onChange: this.annotationTextChangeHandler,
        placeholder: "...",
        value: annotation.annotation
      }))), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "cross",
        onClick: this.cancelEditingHandler,
        flush: "left"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.timeSeriesExplorer.annotationFlyout.cancelButtonLabel",
        defaultMessage: "Cancel"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, isExistingAnnotation && _react.default.createElement(_eui.EuiButtonEmpty, {
        color: "danger",
        onClick: this.deleteConfirmHandler
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.timeSeriesExplorer.annotationFlyout.deleteButtonLabel",
        defaultMessage: "Delete"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        fill: true,
        isDisabled: isInvalid === true,
        onClick: this.saveOrUpdateAnnotation
      }, isExistingAnnotation ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.timeSeriesExplorer.annotationFlyout.updateButtonLabel",
        defaultMessage: "Update"
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.timeSeriesExplorer.annotationFlyout.createButtonLabel",
        defaultMessage: "Create"
      })))))), _react.default.createElement(_delete_annotation_modal.DeleteAnnotationModal, {
        cancelAction: this.closeDeleteModal,
        deleteAction: this.deleteHandler,
        isVisible: isDeleteModalVisible
      }));
    }
  }]);

  return AnnotationFlyoutUI;
}(_react.Component);

var AnnotationFlyout = function AnnotationFlyout(props) {
  var annotationProp = (0, _useObservable.default)(_annotations_service.annotation$);

  if (annotationProp === undefined) {
    return null;
  }

  return _react.default.createElement(AnnotationFlyoutUI, _extends({
    annotation: annotationProp
  }, props));
};

exports.AnnotationFlyout = AnnotationFlyout;