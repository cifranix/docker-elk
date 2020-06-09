"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _testUtils = require("react-dom/test-utils");

var _test_utils = require("../../../../../test_utils");

var _watch_list = require("../../../public/application/sections/watch_list/components/watch_list");

var _constants = require("../../../common/constants");

var _app_context = require("./app_context.mock");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const testBedConfig = {
  memoryRouter: {
    initialEntries: [`${_constants.ROUTES.API_ROOT}/watches`]
  },
  doMountAsync: true
};
const initTestBed = (0, _test_utils.registerTestBed)((0, _app_context.withAppContext)(_watch_list.WatchList), testBedConfig);

const setup = async () => {
  const testBed = await initTestBed();
  /**
   * User Actions
   */

  const selectWatchAt = index => {
    const {
      rows
    } = testBed.table.getMetaData('watchesTable');
    const row = rows[index];
    const checkBox = row.reactWrapper.find('input').hostNodes();
    checkBox.simulate('change', {
      target: {
        checked: true
      }
    });
  };

  const clickWatchAt = async index => {
    const {
      rows
    } = testBed.table.getMetaData('watchesTable');
    const watchesLink = (0, _test_utils.findTestSubject)(rows[index].reactWrapper, 'watchesLink');
    await (0, _testUtils.act)(async () => {
      const {
        href
      } = watchesLink.props();
      testBed.router.navigateTo(href);
      await (0, _test_utils.nextTick)();
      testBed.component.update();
    });
  };

  const clickWatchActionAt = async (index, action) => {
    const {
      component,
      table
    } = testBed;
    const {
      rows
    } = table.getMetaData('watchesTable');
    const currentRow = rows[index];
    const lastColumn = currentRow.columns[currentRow.columns.length - 1].reactWrapper;
    const button = (0, _test_utils.findTestSubject)(lastColumn, `${action}WatchButton`);
    await (0, _testUtils.act)(async () => {
      button.simulate('click');
      component.update();
    });
  };

  return { ...testBed,
    actions: {
      selectWatchAt,
      clickWatchAt,
      clickWatchActionAt
    }
  };
};

exports.setup = setup;