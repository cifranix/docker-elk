"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubSection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SubSection = function SubSection(_ref) {
  var id = _ref.id,
      label = _ref.label,
      children = _ref.children,
      metrics = _ref.metrics,
      onChangeRangeTime = _ref.onChangeRangeTime,
      isLiveStreaming = _ref.isLiveStreaming,
      stopLiveStreaming = _ref.stopLiveStreaming;
  var metric = (0, _react.useMemo)(function () {
    return metrics === null || metrics === void 0 ? void 0 : metrics.find(function (m) {
      return m.id === id;
    });
  }, [id, metrics]);

  if (!children || !metric) {
    return null;
  }

  var childrenWithProps = _react.Children.map(children, function (child) {
    if ((0, _react.isValidElement)(child)) {
      return (0, _react.cloneElement)(child, {
        metric: metric,
        id: id,
        onChangeRangeTime: onChangeRangeTime,
        isLiveStreaming: isLiveStreaming,
        stopLiveStreaming: stopLiveStreaming
      });
    }

    return null;
  });

  return _react.default.createElement("div", {
    style: {
      margin: '10px 0 16px 0'
    },
    id: id
  }, label ? _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h4", null, label)) : null, childrenWithProps);
};

exports.SubSection = SubSection;