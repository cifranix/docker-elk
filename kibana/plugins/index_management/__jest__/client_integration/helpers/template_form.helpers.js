"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formSetup = void 0;

var _index = require("./index");

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

  const clickBackButton = () => {
    testBed.find('backButton').simulate('click');
  };

  const clickSubmitButton = () => {
    testBed.find('submitButton').simulate('click');
  };

  const clickEditButtonAtField = index => {
    testBed.find('editFieldButton').at(index).simulate('click');
  };

  const clickEditFieldUpdateButton = () => {
    testBed.find('editFieldUpdateButton').simulate('click');
  };

  const deleteMappingsFieldAt = index => {
    testBed.find('removeFieldButton').at(index).simulate('click');
    testBed.find('confirmModalConfirmButton').simulate('click');
  };

  const clickCancelCreateFieldButton = () => {
    testBed.find('createFieldForm.cancelButton').simulate('click');
  };

  const completeStepOne = async ({
    name,
    indexPatterns,
    order,
    version
  } = {}) => {
    const {
      form,
      find,
      component
    } = testBed;

    if (name) {
      form.setInputValue('nameField.input', name);
    }

    if (indexPatterns) {
      const indexPatternsFormatted = indexPatterns.map(pattern => ({
        label: pattern,
        value: pattern
      }));
      find('mockComboBox').simulate('change', indexPatternsFormatted); // Using mocked EuiComboBox

      await (0, _index.nextTick)();
    }

    if (order) {
      form.setInputValue('orderField.input', JSON.stringify(order));
    }

    if (version) {
      form.setInputValue('versionField.input', JSON.stringify(version));
    }

    clickNextButton();
    await (0, _index.nextTick)();
    component.update();
  };

  const completeStepTwo = async settings => {
    const {
      find,
      component
    } = testBed;

    if (settings) {
      find('mockCodeEditor').simulate('change', {
        jsonString: settings
      }); // Using mocked EuiCodeEditor

      await (0, _index.nextTick)();
      component.update();
    }

    clickNextButton();
    await (0, _index.nextTick)();
    component.update();
  };

  const completeStepThree = async mappingFields => {
    const {
      component
    } = testBed;

    if (mappingFields) {
      for (const field of mappingFields) {
        const {
          name,
          type
        } = field;
        await addMappingField(name, type);
      }
    } else {
      await (0, _index.nextTick)();
    }

    await (0, _index.nextTick)(50); // hooks updates cycles are tricky, adding some latency is needed

    clickNextButton();
    await (0, _index.nextTick)(50);
    component.update();
  };

  const completeStepFour = async aliases => {
    const {
      find,
      component
    } = testBed;

    if (aliases) {
      find('mockCodeEditor').simulate('change', {
        jsonString: aliases
      }); // Using mocked EuiCodeEditor

      await (0, _index.nextTick)(50);
      component.update();
    }

    clickNextButton();
    await (0, _index.nextTick)(50);
    component.update();
  };

  const selectSummaryTab = tab => {
    const tabs = ['summary', 'request'];
    testBed.find('summaryTabContent').find('.euiTab').at(tabs.indexOf(tab)).simulate('click');
  };

  const addMappingField = async (name, type) => {
    const {
      find,
      form,
      component
    } = testBed;
    form.setInputValue('nameParameterInput', name);
    find('createFieldForm.mockComboBox').simulate('change', [{
      label: type,
      value: type
    }]);
    await (0, _index.nextTick)(50);
    component.update();
    find('createFieldForm.addButton').simulate('click');
    await (0, _index.nextTick)();
    component.update();
  };

  return { ...testBed,
    actions: {
      clickNextButton,
      clickBackButton,
      clickSubmitButton,
      clickEditButtonAtField,
      clickEditFieldUpdateButton,
      deleteMappingsFieldAt,
      clickCancelCreateFieldButton,
      completeStepOne,
      completeStepTwo,
      completeStepThree,
      completeStepFour,
      selectSummaryTab,
      addMappingField
    }
  };
};

exports.formSetup = formSetup;