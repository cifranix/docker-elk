"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceCopyResultDetails = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _copy_status_indicator = require("./copy_status_indicator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SpaceCopyResultDetails = function SpaceCopyResultDetails(props) {
  var onOverwriteClick = function onOverwriteClick(object) {
    var retry = props.retries.find(function (r) {
      return r.type === object.type && r.id === object.id;
    });
    props.onRetriesChange([].concat(_toConsumableArray(props.retries.filter(function (r) {
      return r !== retry;
    })), [{
      type: object.type,
      id: object.id,
      overwrite: retry ? !retry.overwrite : true
    }]));
  };

  var hasPendingOverwrite = function hasPendingOverwrite(object) {
    var retry = props.retries.find(function (r) {
      return r.type === object.type && r.id === object.id;
    });
    return Boolean(retry && retry.overwrite);
  };

  var objects = props.summarizedCopyResult.objects;
  return _react.default.createElement("div", {
    className: "spcCopyToSpaceResultDetails"
  }, objects.map(function (object, index) {
    var objectOverwritePending = hasPendingOverwrite(object);
    var showOverwriteButton = object.conflicts.length > 0 && !objectOverwritePending && !props.conflictResolutionInProgress;
    var showSkipButton = !showOverwriteButton && objectOverwritePending && !props.conflictResolutionInProgress;
    return _react.default.createElement(_eui.EuiFlexGroup, {
      responsive: false,
      key: index,
      alignItems: "center",
      gutterSize: "s",
      className: "spcCopyToSpaceResultDetails__row"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: 5,
      className: "spcCopyToSpaceResultDetails__savedObjectName"
    }, _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement("p", {
      className: "eui-textTruncate",
      title: object.name || object.id
    }, object.type, ": ", object.name || object.id))), showOverwriteButton && _react.default.createElement(_eui.EuiFlexItem, {
      grow: 1
    }, _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: function onClick() {
        return onOverwriteClick(object);
      },
      size: "xs",
      "data-test-subj": "cts-overwrite-conflict-".concat(object.id)
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.copyDetail.overwriteButton",
      defaultMessage: "Overwrite"
    })))), showSkipButton && _react.default.createElement(_eui.EuiFlexItem, {
      grow: 1
    }, _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: function onClick() {
        return onOverwriteClick(object);
      },
      size: "xs",
      "data-test-subj": "cts-skip-conflict-".concat(object.id)
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.copyDetail.skipOverwriteButton",
      defaultMessage: "Skip"
    })))), _react.default.createElement(_eui.EuiFlexItem, {
      className: "spcCopyToSpaceResultDetails__statusIndicator",
      grow: 1
    }, _react.default.createElement("div", {
      className: "eui-textRight"
    }, _react.default.createElement(_copy_status_indicator.CopyStatusIndicator, {
      summarizedCopyResult: props.summarizedCopyResult,
      object: object,
      overwritePending: hasPendingOverwrite(object),
      conflictResolutionInProgress: props.conflictResolutionInProgress && objectOverwritePending
    }))));
  }));
};

exports.SpaceCopyResultDetails = SpaceCopyResultDetails;