"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _testUtils = require("react-dom/test-utils");

var _test_utils = require("../../../../../test_utils");

var _home = require("../../../public/application/sections/home");

var _constants = require("../../../common/constants");

var _store = require("../../../public/application/store");

var _setup_environment = require("./setup_environment");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-line @kbn/eslint/no-restricted-paths
const testBedConfig = {
  store: () => (0, _store.indexManagementStore)(_setup_environment.services),
  memoryRouter: {
    initialEntries: [`${_constants.BASE_PATH}indices`],
    componentRoutePath: `${_constants.BASE_PATH}:section(indices|templates)`
  },
  doMountAsync: true
};
const initTestBed = (0, _test_utils.registerTestBed)((0, _setup_environment.WithAppDependencies)(_home.IndexManagementHome), testBedConfig);

const setup = async () => {
  const testBed = await initTestBed();
  /**
   * Additional helpers
   */

  const findAction = action => {
    const actions = ['edit', 'clone', 'delete'];
    const {
      component
    } = testBed;
    return component.find('.euiContextMenuItem').at(actions.indexOf(action));
  };
  /**
   * User Actions
   */


  const selectHomeTab = tab => {
    testBed.find(tab).simulate('click');
  };

  const selectDetailsTab = tab => {
    const tabs = ['summary', 'settings', 'mappings', 'aliases'];
    testBed.find('templateDetails.tab').at(tabs.indexOf(tab)).simulate('click');
  };

  const clickReloadButton = () => {
    const {
      find
    } = testBed;
    find('reloadButton').simulate('click');
  };

  const clickActionMenu = async templateName => {
    const {
      component
    } = testBed; // When a table has > 2 actions, EUI displays an overflow menu with an id "<template_name>-actions"
    // The template name may contain a period (.) so we use bracket syntax for selector

    component.find(`div[id="${templateName}-actions"] button`).simulate('click');
  };

  const clickTemplateAction = (templateName, action) => {
    const actions = ['edit', 'clone', 'delete'];
    const {
      component
    } = testBed;
    clickActionMenu(templateName);
    component.find('.euiContextMenuItem').at(actions.indexOf(action)).simulate('click');
  };

  const clickTemplateAt = async index => {
    const {
      component,
      table,
      router
    } = testBed;
    const {
      rows
    } = table.getMetaData('templateTable');
    const templateLink = (0, _test_utils.findTestSubject)(rows[index].reactWrapper, 'templateDetailsLink');
    await (0, _testUtils.act)(async () => {
      const {
        href
      } = templateLink.props();
      router.navigateTo(href);
      await (0, _test_utils.nextTick)();
      component.update();
    });
  };

  const clickCloseDetailsButton = () => {
    const {
      find
    } = testBed;
    find('closeDetailsButton').simulate('click');
  };

  const selectIndexDetailsTab = async tab => {
    const indexDetailsTabs = ['settings', 'mappings', 'stats', 'edit_settings'];
    const {
      find,
      component
    } = testBed;
    await (0, _testUtils.act)(async () => {
      find('detailPanelTab').at(indexDetailsTabs.indexOf(tab)).simulate('click');
    });
    component.update();
  };

  return { ...testBed,
    findAction,
    actions: {
      selectHomeTab,
      selectDetailsTab,
      selectIndexDetailsTab,
      clickReloadButton,
      clickTemplateAction,
      clickTemplateAt,
      clickCloseDetailsButton,
      clickActionMenu
    }
  };
};

exports.setup = setup;