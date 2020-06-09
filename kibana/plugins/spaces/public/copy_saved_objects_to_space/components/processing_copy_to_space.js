"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessingCopyToSpace = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _space_result = require("./space_result");

var _ = require("..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProcessingCopyToSpace = function ProcessingCopyToSpace(props) {
  function updateRetries(spaceId, updatedRetries) {
    props.onRetriesChange(_objectSpread({}, props.retries, _defineProperty({}, spaceId, updatedRetries)));
  }

  return _react.default.createElement("div", {
    "data-test-subj": "copy-to-space-processing"
  }, _react.default.createElement(_eui.EuiListGroup, {
    className: "spcCopyToSpaceOptionsView",
    flush: true
  }, _react.default.createElement(_eui.EuiListGroupItem, {
    iconType: props.copyOptions.includeRelated ? 'check' : 'cross',
    label: props.copyOptions.includeRelated ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.includeRelatedLabel",
      defaultMessage: "Including related saved objects"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.dontIncludeRelatedLabel",
      defaultMessage: "Not including related saved objects"
    })
  }), _react.default.createElement(_eui.EuiListGroupItem, {
    iconType: props.copyOptions.overwrite ? 'check' : 'cross',
    label: props.copyOptions.overwrite ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.overwriteLabel",
      defaultMessage: "Automatically overwriting saved objects"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.dontOverwriteLabel",
      defaultMessage: "Not overwriting saved objects"
    })
  })), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.spaces.management.copyToSpace.copyResultsLabel",
    defaultMessage: "Copy results"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), props.copyOptions.selectedSpaceIds.map(function (id) {
    var space = props.spaces.find(function (s) {
      return s.id === id;
    });
    var spaceCopyResult = props.copyResult[space.id];
    var summarizedSpaceCopyResult = (0, _.summarizeCopyResult)(props.savedObject, spaceCopyResult, props.copyOptions.includeRelated);
    return _react.default.createElement(_react.Fragment, {
      key: id
    }, _react.default.createElement(_space_result.SpaceResult, {
      savedObject: props.savedObject,
      space: space,
      summarizedCopyResult: summarizedSpaceCopyResult,
      retries: props.retries[space.id] || [],
      onRetriesChange: function onRetriesChange(retries) {
        return updateRetries(space.id, retries);
      },
      conflictResolutionInProgress: props.conflictResolutionInProgress
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }));
};

exports.ProcessingCopyToSpace = ProcessingCopyToSpace;