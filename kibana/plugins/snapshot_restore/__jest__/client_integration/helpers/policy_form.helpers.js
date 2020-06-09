"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formSetup = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const formSetup = async initTestBed => {
  const testBed = await initTestBed(); // User actions

  const clickNextButton = () => {
    testBed.find('nextButton').simulate('click');
  };

  const clickSubmitButton = () => {
    testBed.find('submitButton').simulate('click');
  };

  return { ...testBed,
    actions: {
      clickNextButton,
      clickSubmitButton
    }
  };
};

exports.formSetup = formSetup;