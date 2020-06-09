"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEST_SUBJ_ACTION_FACTORY_ITEM = exports.TEST_SUBJ_SELECTED_ACTION_FACTORY = exports.ActionWizard = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("./i18n");

require("./action_wizard.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ActionWizard = function ActionWizard(_ref) {
  var currentActionFactory = _ref.currentActionFactory,
      actionFactories = _ref.actionFactories,
      onActionFactoryChange = _ref.onActionFactoryChange,
      _onConfigChange = _ref.onConfigChange,
      config = _ref.config;

  // auto pick action factory if there is only 1 available
  if (!currentActionFactory && actionFactories.length === 1) {
    onActionFactoryChange(actionFactories[0]);
  }

  if (currentActionFactory && config) {
    return _react.default.createElement(SelectedActionFactory, {
      actionFactory: currentActionFactory,
      showDeselect: actionFactories.length > 1,
      onDeselect: function onDeselect() {
        onActionFactoryChange(null);
      },
      config: config,
      onConfigChange: function onConfigChange(newConfig) {
        _onConfigChange(newConfig);
      }
    });
  }

  return _react.default.createElement(ActionFactorySelector, {
    actionFactories: actionFactories,
    onActionFactorySelected: function onActionFactorySelected(actionFactory) {
      onActionFactoryChange(actionFactory);
    }
  });
};

exports.ActionWizard = ActionWizard;
var TEST_SUBJ_SELECTED_ACTION_FACTORY = 'selected-action-factory';
exports.TEST_SUBJ_SELECTED_ACTION_FACTORY = TEST_SUBJ_SELECTED_ACTION_FACTORY;

var SelectedActionFactory = function SelectedActionFactory(_ref2) {
  var actionFactory = _ref2.actionFactory,
      onDeselect = _ref2.onDeselect,
      showDeselect = _ref2.showDeselect,
      onConfigChange = _ref2.onConfigChange,
      config = _ref2.config;
  return _react.default.createElement("div", {
    className: "auaActionWizard__selectedActionFactoryContainer",
    "data-test-subj": TEST_SUBJ_SELECTED_ACTION_FACTORY,
    "data-testid": TEST_SUBJ_SELECTED_ACTION_FACTORY
  }, _react.default.createElement("header", null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, actionFactory.iconType && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: actionFactory.iconType,
    size: "m"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h4", null, actionFactory.displayName))), showDeselect && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    onClick: function onClick() {
      return onDeselect();
    }
  }, _i18n.txtChangeButton)))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement("div", null, actionFactory.wizard({
    config: config,
    onConfig: onConfigChange
  })));
};

var TEST_SUBJ_ACTION_FACTORY_ITEM = 'action-factory-item';
exports.TEST_SUBJ_ACTION_FACTORY_ITEM = TEST_SUBJ_ACTION_FACTORY_ITEM;

var ActionFactorySelector = function ActionFactorySelector(_ref3) {
  var actionFactories = _ref3.actionFactories,
      onActionFactorySelected = _ref3.onActionFactorySelected;

  if (actionFactories.length === 0) {
    // this is not user facing, as it would be impossible to get into this state
    // just leaving for dev purposes for troubleshooting
    return _react.default.createElement("div", null, "No action factories to pick from");
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true
  }, actionFactories.map(function (actionFactory) {
    return _react.default.createElement(_eui.EuiKeyPadMenuItemButton, {
      className: "auaActionWizard__actionFactoryItem",
      key: actionFactory.type,
      label: actionFactory.displayName,
      "data-testid": TEST_SUBJ_ACTION_FACTORY_ITEM,
      "data-test-subj": TEST_SUBJ_ACTION_FACTORY_ITEM,
      onClick: function onClick() {
        return onActionFactorySelected(actionFactory);
      }
    }, actionFactory.iconType && _react.default.createElement(_eui.EuiIcon, {
      type: actionFactory.iconType,
      size: "m"
    }));
  }));
};