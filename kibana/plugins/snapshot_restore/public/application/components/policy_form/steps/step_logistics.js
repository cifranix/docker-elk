"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyStepLogistics = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../../shared_imports");

var _app_context = require("../../../app_context");

var _constants = require("../../../constants");

var _http = require("../../../services/http");

var _navigation = require("../../../services/navigation");

var _documentation = require("../../../services/documentation");

var _ = require("../../");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PolicyStepLogistics = function PolicyStepLogistics(_ref) {
  var policy = _ref.policy,
      updatePolicy = _ref.updatePolicy,
      isEditing = _ref.isEditing,
      currentUrl = _ref.currentUrl,
      errors = _ref.errors;

  // Load repositories for repository dropdown field
  var _useLoadRepositories = (0, _http.useLoadRepositories)(),
      errorLoadingRepositories = _useLoadRepositories.error,
      isLoadingRepositories = _useLoadRepositories.isLoading,
      _useLoadRepositories$ = _useLoadRepositories.data;

  _useLoadRepositories$ = _useLoadRepositories$ === void 0 ? {
    repositories: [],
    managedRepository: {
      name: undefined
    }
  } : _useLoadRepositories$;
  var repositories = _useLoadRepositories$.repositories,
      managedRepository = _useLoadRepositories$.managedRepository,
      reloadRepositories = _useLoadRepositories.sendRequest;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n; // State for touched inputs


  var _useState = (0, _react.useState)({
    name: false,
    snapshotName: false,
    repository: false,
    schedule: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      touched = _useState2[0],
      setTouched = _useState2[1]; // State for cron editor


  var _useState3 = (0, _react.useState)({
    expression: _constants.DEFAULT_POLICY_SCHEDULE,
    frequency: _constants.DEFAULT_POLICY_FREQUENCY
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      simpleCron = _useState4[0],
      setSimpleCron = _useState4[1];

  var _useState5 = (0, _react.useState)(Boolean(policy.schedule && policy.schedule !== _constants.DEFAULT_POLICY_SCHEDULE)),
      _useState6 = _slicedToArray(_useState5, 2),
      isAdvancedCronVisible = _useState6[0],
      setIsAdvancedCronVisible = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      fieldToPreferredValueMap = _useState8[0],
      setFieldToPreferredValueMap = _useState8[1];

  var renderNameField = function renderNameField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.nameDescriptionTitle",
        defaultMessage: "Policy name"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.nameDescription",
        defaultMessage: "A unique identifier for this policy."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.nameLabel",
        defaultMessage: "Name"
      }),
      isInvalid: touched.name && Boolean(errors.name),
      error: errors.name,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFieldText, {
      defaultValue: policy.name,
      fullWidth: true,
      onBlur: function onBlur() {
        return setTouched(_objectSpread({}, touched, {
          name: true
        }));
      },
      onChange: function onChange(e) {
        updatePolicy({
          name: e.target.value
        }, {
          managedRepository: managedRepository,
          isEditing: isEditing,
          policyName: policy.name
        });
      },
      placeholder: i18n.translate('xpack.snapshotRestore.policyForm.stepLogistics.namePlaceholder', {
        defaultMessage: 'daily-snapshots',
        description: 'Example SLM policy name. Similar to index names, do not use spaces in translation.'
      }),
      "data-test-subj": "nameInput",
      disabled: isEditing
    })));
  };

  var renderRepositoryField = function renderRepositoryField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.repositoryDescriptionTitle",
        defaultMessage: "Repository"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.repositoryDescription",
        defaultMessage: "The repository where you want to store the snapshots."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.policyRepositoryLabel",
        defaultMessage: "Repository"
      }),
      isInvalid: touched.repository && Boolean(errors.repository),
      error: errors.repository,
      fullWidth: true
    }, renderRepositorySelect()));
  };

  var renderRepositorySelect = function renderRepositorySelect() {
    if (isLoadingRepositories) {
      return _react.default.createElement(_.SectionLoading, {
        inline: true
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.loadingRepositoriesDescription",
        defaultMessage: "Loading repositories\u2026"
      }));
    }

    if (errorLoadingRepositories) {
      return _react.default.createElement(_.SectionError, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.policyForm.loadingRepositoriesErrorMessage",
          defaultMessage: "Error loading repositories"
        }),
        error: errorLoadingRepositories,
        actions: _react.default.createElement(_eui.EuiButton, {
          onClick: function onClick() {
            return reloadRepositories();
          },
          color: "danger",
          iconType: "refresh",
          "data-test-subj": "reloadRepositoriesButton"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.policyForm.reloadRepositoriesButtonLabel",
          defaultMessage: "Reload repositories"
        }))
      });
    }

    if (repositories.length === 0) {
      return _react.default.createElement(_.SectionError, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.policyForm.noRepositoriesErrorTitle",
          defaultMessage: "You don't have any repositories"
        }),
        error: {
          error: i18n.translate('xpack.snapshotRestore.policyForm.noRepositoriesErrorMessage', {
            defaultMessage: 'You must register a repository to store your snapshots.'
          })
        },
        actions: _react.default.createElement(_eui.EuiButton, {
          href: (0, _navigation.linkToAddRepository)(currentUrl),
          color: "danger",
          iconType: "plusInCircle",
          "data-test-subj": "addRepositoryButton"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.policyForm.addRepositoryButtonLabel",
          defaultMessage: "Register a repository"
        }))
      });
    } else {
      if (!policy.repository) {
        updatePolicy({
          repository: repositories[0].name
        }, {
          managedRepository: managedRepository,
          isEditing: isEditing,
          policyName: policy.name
        });
      }
    }

    return _react.default.createElement(_eui.EuiSelect, {
      options: repositories.map(function (_ref2) {
        var name = _ref2.name;
        return {
          value: name,
          text: name
        };
      }),
      value: policy.repository || repositories[0].name,
      onBlur: function onBlur() {
        return setTouched(_objectSpread({}, touched, {
          repository: true
        }));
      },
      onChange: function onChange(e) {
        updatePolicy({
          repository: e.target.value
        }, {
          managedRepository: managedRepository,
          isEditing: isEditing,
          policyName: policy.name
        });
      },
      fullWidth: true,
      "data-test-subj": "repositorySelect"
    });
  };

  var renderSnapshotNameField = function renderSnapshotNameField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.snapshotNameDescriptionTitle",
        defaultMessage: "Snapshot name"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.snapshotNameDescription",
        defaultMessage: "The name for the snapshots. A unique identifier is automatically added to each name."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.policySnapshotNameLabel",
        defaultMessage: "Snapshot name"
      }),
      isInvalid: touched.snapshotName && Boolean(errors.snapshotName),
      error: errors.snapshotName,
      helpText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.policySnapshotNameHelpText",
        defaultMessage: "Supports date math expressions. {docLink}",
        values: {
          docLink: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationLinksService.getDateMathIndexNamesUrl(),
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.policyForm.stepLogistics.policySnapshotNameHelpTextDocLink",
            defaultMessage: "Learn more."
          }))
        }
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFieldText, {
      defaultValue: policy.snapshotName,
      fullWidth: true,
      onChange: function onChange(e) {
        updatePolicy({
          snapshotName: e.target.value
        }, {
          managedRepository: managedRepository,
          isEditing: isEditing,
          policyName: policy.name
        });
      },
      onBlur: function onBlur() {
        return setTouched(_objectSpread({}, touched, {
          snapshotName: true
        }));
      },
      placeholder: i18n.translate('xpack.snapshotRestore.policyForm.stepLogistics.policySnapshotNamePlaceholder', {
        defaultMessage: '<daily-snap-\\{now/d\\}>',
        description: 'Example date math snapshot name. Keeping the same syntax is important: <SOME-TRANSLATION-{now/d}>'
      }),
      "data-test-subj": "snapshotNameInput"
    })));
  };

  var renderScheduleField = function renderScheduleField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.scheduleDescriptionTitle",
        defaultMessage: "Schedule"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.scheduleDescription",
        defaultMessage: "The frequency at which to take the snapshots."
      }),
      fullWidth: true
    }, isAdvancedCronVisible ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.policyScheduleLabel",
        defaultMessage: "Schedule"
      }),
      isInvalid: touched.schedule && Boolean(errors.schedule),
      error: errors.schedule,
      helpText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepLogistics.policyScheduleHelpText",
        defaultMessage: "Use cron expression. {docLink}",
        values: {
          docLink: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationLinksService.getCronUrl(),
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.policyForm.stepLogistics.policyScheduleHelpTextDocLink",
            defaultMessage: "Learn more."
          }))
        }
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFieldText, {
      defaultValue: policy.schedule,
      fullWidth: true,
      onChange: function onChange(e) {
        updatePolicy({
          schedule: e.target.value
        }, {
          managedRepository: managedRepository,
          isEditing: isEditing,
          policyName: policy.name
        });
      },
      onBlur: function onBlur() {
        return setTouched(_objectSpread({}, touched, {
          schedule: true
        }));
      },
      placeholder: _constants.DEFAULT_POLICY_SCHEDULE,
      "data-test-subj": "advancedCronInput"
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        setIsAdvancedCronVisible(false);
        updatePolicy({
          schedule: simpleCron.expression
        }, {
          managedRepository: managedRepository,
          isEditing: isEditing,
          policyName: policy.name
        });
      },
      "data-test-subj": "showBasicCronLink"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepLogistics.policyScheduleButtonBasicLabel",
      defaultMessage: "Create basic interval"
    })))) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_shared_imports.CronEditor, {
      fieldToPreferredValueMap: fieldToPreferredValueMap,
      cronExpression: simpleCron.expression,
      frequency: simpleCron.frequency,
      onChange: function onChange(_ref3) {
        var expression = _ref3.cronExpression,
            frequency = _ref3.frequency,
            newFieldToPreferredValueMap = _ref3.fieldToPreferredValueMap;
        setSimpleCron({
          expression: expression,
          frequency: frequency
        });
        setFieldToPreferredValueMap(newFieldToPreferredValueMap);
        updatePolicy({
          schedule: expression
        }, {
          managedRepository: managedRepository,
          isEditing: isEditing,
          policyName: policy.name
        });
      }
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        setIsAdvancedCronVisible(true);
      },
      "data-test-subj": "showAdvancedCronLink"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepLogistics.policyScheduleButtonAdvancedLabel",
      defaultMessage: "Create cron expression"
    })))));
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.stepLogisticsTitle",
    defaultMessage: "Logistics"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationLinksService.getSlmUrl(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.stepLogistics.docsButtonLabel",
    defaultMessage: "Logistics docs"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), renderNameField(), renderSnapshotNameField(), renderRepositoryField(), renderScheduleField());
};

exports.PolicyStepLogistics = PolicyStepLogistics;