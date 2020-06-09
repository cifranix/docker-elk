"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatafeedPreviewFlyout = exports.EDITOR_MODE = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _ml_job_editor = require("../../../../../jobs_list/components/ml_job_editor");

var _job_creator_context = require("../../job_creator_context");

var _job_service = require("../../../../../../services/job_service");

var _job_utils = require("../../../../../../../../common/util/job_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EDITOR_HEIGHT = '800px';
var EDITOR_MODE;
exports.EDITOR_MODE = EDITOR_MODE;

(function (EDITOR_MODE) {
  EDITOR_MODE[EDITOR_MODE["HIDDEN"] = 0] = "HIDDEN";
  EDITOR_MODE[EDITOR_MODE["READONLY"] = 1] = "READONLY";
  EDITOR_MODE[EDITOR_MODE["EDITABLE"] = 2] = "EDITABLE";
})(EDITOR_MODE || (exports.EDITOR_MODE = EDITOR_MODE = {}));

var DatafeedPreviewFlyout = function DatafeedPreviewFlyout(_ref) {
  var isDisabled = _ref.isDisabled;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showFlyout = _useState2[0],
      setShowFlyout = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      previewJsonString = _useState4[0],
      setPreviewJsonString = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  function toggleFlyout() {
    setShowFlyout(!showFlyout);
  }

  (0, _react.useEffect)(function () {
    if (showFlyout === true) {
      loadDataPreview();
    }
  }, [showFlyout]);

  function loadDataPreview() {
    return _loadDataPreview.apply(this, arguments);
  }

  function _loadDataPreview() {
    _loadDataPreview = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var combinedJob, resp, data, errorText;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              setPreviewJsonString('');
              combinedJob = _objectSpread({}, jobCreator.jobConfig, {
                datafeed_config: jobCreator.datafeedConfig
              });

              if (!(combinedJob.datafeed_config && combinedJob.datafeed_config.indices.length)) {
                _context.next = 18;
                break;
              }

              _context.prev = 4;
              _context.next = 7;
              return _job_service.mlJobService.searchPreview(combinedJob);

            case 7:
              resp = _context.sent;
              data = resp.aggregations ? resp.aggregations.buckets.buckets.slice(0, _job_utils.ML_DATA_PREVIEW_COUNT) : resp.hits.hits;
              setPreviewJsonString(JSON.stringify(data, null, 2));
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              setPreviewJsonString(JSON.stringify(_context.t0, null, 2));

            case 15:
              setLoading(false);
              _context.next = 20;
              break;

            case 18:
              errorText = _i18n.i18n.translate('xpack.ml.newJob.wizard.datafeedPreviewFlyout.datafeedDoesNotExistLabel', {
                defaultMessage: 'Datafeed does not exist'
              });
              setPreviewJsonString(errorText);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }));
    return _loadDataPreview.apply(this, arguments);
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(FlyoutButton, {
    onClick: toggleFlyout,
    isDisabled: isDisabled
  }), showFlyout === true && isDisabled === false && _react.default.createElement(_eui.EuiFlyout, {
    onClose: function onClose() {
      return setShowFlyout(false);
    },
    hideCloseButton: true,
    size: "m"
  }, _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(Contents, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.datafeedPreviewFlyout.title', {
      defaultMessage: 'Datafeed preview'
    }),
    value: previewJsonString,
    loading: loading
  })), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: function onClick() {
      return setShowFlyout(false);
    },
    flush: "left"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.datafeedPreviewFlyout.closeButton",
    defaultMessage: "Close"
  })))))));
};

exports.DatafeedPreviewFlyout = DatafeedPreviewFlyout;

var FlyoutButton = function FlyoutButton(_ref2) {
  var isDisabled = _ref2.isDisabled,
      onClick = _ref2.onClick;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onClick,
    isDisabled: isDisabled,
    "data-test-subj": "mlJobWizardButtonPreviewJobJson"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.datafeedPreviewFlyout.showButton",
    defaultMessage: "Datafeed preview"
  }));
};

var Contents = function Contents(_ref3) {
  var title = _ref3.title,
      value = _ref3.value,
      loading = _ref3.loading;
  return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h5", null, title)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), loading === true ? _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  }), _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "l"
  }))) : _react.default.createElement(_ml_job_editor.MLJobEditor, {
    value: value,
    height: EDITOR_HEIGHT,
    readOnly: true
  }));
};