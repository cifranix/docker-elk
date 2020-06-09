"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryFormStepOne = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../common/constants");

var _documentation = require("../../services/documentation");

var _http = require("../../services/http");

var _text = require("../../services/text");

var _ = require("../");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RepositoryFormStepOne = function RepositoryFormStepOne(_ref) {
  var repository = _ref.repository,
      onNext = _ref.onNext,
      updateRepository = _ref.updateRepository,
      validation = _ref.validation;

  // Load repository types
  var _useLoadRepositoryTyp = (0, _http.useLoadRepositoryTypes)(),
      repositoryTypesError = _useLoadRepositoryTyp.error,
      repositoryTypesLoading = _useLoadRepositoryTyp.isLoading,
      _useLoadRepositoryTyp2 = _useLoadRepositoryTyp.data,
      repositoryTypes = _useLoadRepositoryTyp2 === void 0 ? [] : _useLoadRepositoryTyp2;

  var hasValidationErrors = !validation.isValid;

  var onTypeChange = function onTypeChange(newType) {
    if (repository.type === _constants.REPOSITORY_TYPES.source) {
      updateRepository({
        settings: {
          delegateType: newType
        }
      });
    } else {
      updateRepository({
        type: newType,
        settings: {}
      });
    }
  };

  var pluginDocLink = _react.default.createElement(_eui.EuiLink, {
    href: _documentation.documentationLinksService.getRepositoryPluginDocUrl(),
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.repositoryForm.fields.typePluginsDocLinkText",
    defaultMessage: "Learn more about plugins."
  }));

  var renderNameField = function renderNameField() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.fields.nameDescriptionTitle",
        defaultMessage: "Repository name"
      }))),
      description: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.fields.nameDescription",
        defaultMessage: "A unique name for the repository."
      }),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.fields.nameLabel",
        defaultMessage: "Name"
      }),
      isInvalid: Boolean(hasValidationErrors && validation.errors.name),
      error: validation.errors.name,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFieldText, {
      defaultValue: repository.name,
      fullWidth: true,
      onChange: function onChange(e) {
        updateRepository({
          name: e.target.value
        });
      },
      "data-test-subj": "nameInput"
    })));
  };

  var renderTypeCard = function renderTypeCard(type, index) {
    var isSelectedType = (repository.type === _constants.REPOSITORY_TYPES.source ? repository.settings.delegateType : repository.type) === type;

    var displayName = _text.textService.getRepositoryTypeName(type);

    return _react.default.createElement(_eui.EuiFlexItem, {
      key: index
    }, _react.default.createElement(_eui.EuiCard, {
      title: displayName,
      icon: _react.default.createElement(_.RepositoryTypeLogo, {
        type: type,
        size: "l"
      }),
      description: _react.default.createElement(_react.Fragment, null)
      /* EuiCard requires `description` */
      ,
      footer: _react.default.createElement(_eui.EuiButtonEmpty, {
        href: _documentation.documentationLinksService.getRepositoryTypeDocUrl(type),
        target: "_blank",
        size: "xs",
        iconType: "iInCircle"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.fields.typeDocsLinkText",
        defaultMessage: "Learn more"
      })),
      selectable: {
        onClick: function onClick() {
          return onTypeChange(type);
        },
        isSelected: isSelectedType
      },
      "data-test-subj": "".concat(type, "RepositoryType")
    }));
  };

  var renderTypes = function renderTypes() {
    if (repositoryTypesError) {
      return _react.default.createElement(_.SectionError, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.repositoryForm.loadingRepositoryTypesErrorMessage",
          defaultMessage: "Error loading repository types"
        }),
        error: repositoryTypesError
      });
    }

    if (repositoryTypesLoading) {
      return _react.default.createElement(_.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.loadingRepositoryTypesDescription",
        defaultMessage: "Loading repository types\u2026"
      }));
    }

    if (!repositoryTypes.length) {
      return _react.default.createElement(_eui.EuiCallOut, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.repositoryForm.noRepositoryTypesErrorTitle",
          defaultMessage: "No repository types available"
        }),
        color: "warning",
        "data-test-subj": "noRepositoryTypesError"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.noRepositoryTypesErrorMessage",
        defaultMessage: "You can install plugins to enable different repository types. {docLink}",
        values: {
          docLink: pluginDocLink
        }
      }));
    }

    return _react.default.createElement(_eui.EuiFlexGrid, {
      columns: 4
    }, repositoryTypes.map(function (type, index) {
      return renderTypeCard(type, index);
    }));
  };

  var renderTypeField = function renderTypeField() {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.fields.typeDescriptionTitle",
      defaultMessage: "Repository type"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiText, {
      id: "repositoryTypeDescription",
      size: "s",
      color: "subdued"
    }, repositoryTypes.includes(_constants.REPOSITORY_TYPES.fs) && repositoryTypes.includes(_constants.REPOSITORY_TYPES.url) ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.fields.defaultTypeDescription",
      defaultMessage: "Elasticsearch supports file system and read-only URL repositories. Additional types require plugins. {docLink}",
      values: {
        docLink: pluginDocLink
      }
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.fields.cloudTypeDescription",
      defaultMessage: "Elasticsearch provides core plugins for custom repositories. {docLink}",
      values: {
        docLink: pluginDocLink
      }
    })), _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true,
      describedByIds: ['repositoryTypeDescription'],
      fullWidth: true,
      isInvalid: Boolean(hasValidationErrors && validation.errors.type),
      error: validation.errors.type
    }, renderTypes()), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }));
  };

  var renderSourceOnlyToggle = function renderSourceOnlyToggle() {
    return _react.default.createElement(_eui.EuiDescribedFormGroup, {
      title: _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.fields.sourceOnlyDescriptionTitle",
        defaultMessage: "Source-only snapshots"
      }))),
      description: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.fields.sourceOnlyDescription",
        defaultMessage: "Creates source-only snapshots that take up to 50% less space. {docLink}",
        values: {
          docLink: _react.default.createElement(_eui.EuiLink, {
            href: _documentation.documentationLinksService.getRepositoryTypeDocUrl(_constants.REPOSITORY_TYPES.source),
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.repositoryForm.fields.sourceOnlyDocLinkText",
            defaultMessage: "Learn more about source-only repositories."
          }))
        }
      })),
      fullWidth: true
    }, _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiSwitch, {
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.fields.sourceOnlyLabel",
        defaultMessage: "Source-only snapshots"
      }),
      checked: repository.type === _constants.REPOSITORY_TYPES.source,
      onChange: function onChange(e) {
        if (e.target.checked) {
          updateRepository({
            type: _constants.REPOSITORY_TYPES.source,
            settings: _objectSpread({}, repository.settings, {
              delegateType: repository.type
            })
          });
        } else {
          var _repository$settings = repository.settings,
              delegateType = _repository$settings.delegateType,
              rest = _objectWithoutProperties(_repository$settings, ["delegateType"]);

          updateRepository({
            type: delegateType || null,
            settings: rest
          });
        }
      },
      "data-test-subj": "sourceOnlyToggle"
    })));
  };

  var renderActions = function renderActions() {
    return _react.default.createElement(_eui.EuiButton, {
      color: "primary",
      onClick: onNext,
      fill: true,
      iconType: "arrowRight",
      iconSide: "right",
      "data-test-subj": "nextButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.nextButtonLabel",
      defaultMessage: "Next"
    }));
  };

  var renderFormValidationError = function renderFormValidationError() {
    if (!hasValidationErrors) {
      return null;
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.validationErrorTitle",
        defaultMessage: "Fix errors before continuing."
      }),
      color: "danger",
      "data-test-subj": "repositoryFormError"
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }));
  };

  return _react.default.createElement(_react.Fragment, null, renderNameField(), renderTypeField(), renderSourceOnlyToggle(), renderFormValidationError(), renderActions());
};

exports.RepositoryFormStepOne = RepositoryFormStepOne;