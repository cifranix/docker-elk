"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _constants = require("../../../../../common/constants");

var _breadcrumbs = require("../../../lib/breadcrumbs");

var _components = require("../../../components");

var _api = require("../../../lib/api");

var _navigation = require("../../../lib/navigation");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WatchList = function WatchList() {
  // hooks
  var _useAppContext = (0, _app_context.useAppContext)(),
      setBreadcrumbs = _useAppContext.setBreadcrumbs,
      watcherGettingStartedUrl = _useAppContext.links.watcherGettingStartedUrl;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selection = _useState2[0],
      setSelection = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      watchesToDelete = _useState4[0],
      setWatchesToDelete = _useState4[1]; // Filter out deleted watches on the client, because the API will return 200 even though some watches
  // may not really be deleted until after they're done firing and this could take some time.


  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      deletedWatches = _useState6[0],
      setDeletedWatches = _useState6[1];

  (0, _react.useEffect)(function () {
    setBreadcrumbs([_breadcrumbs.listBreadcrumb]);
  }, [setBreadcrumbs]);

  var _useLoadWatches = (0, _api.useLoadWatches)(_constants.REFRESH_INTERVALS.WATCH_LIST),
      isWatchesLoading = _useLoadWatches.isLoading,
      watches = _useLoadWatches.data,
      error = _useLoadWatches.error;

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isPopoverOpen = _useState8[0],
      setIsPopOverOpen = _useState8[1];

  var availableWatches = (0, _react.useMemo)(function () {
    return watches ? watches.filter(function (watch) {
      return !deletedWatches.includes(watch.id);
    }) : undefined;
  }, [watches, deletedWatches]);

  var watcherDescriptionText = _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchList.subhead",
    defaultMessage: "Watch for changes or anomalies in your data and take action if needed."
  });

  var createWatchContextMenu = _react.default.createElement(_eui.EuiPopover, {
    id: "createWatchPanel",
    button: _react.default.createElement(_eui.EuiButton, {
      fill: true,
      "data-test-subj": "createWatchButton",
      iconType: "arrowDown",
      iconSide: "right",
      onClick: function onClick() {
        return setIsPopOverOpen(!isPopoverOpen);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchList.createWatchButtonLabel",
      defaultMessage: "Create"
    })),
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      return setIsPopOverOpen(false);
    },
    panelPaddingSize: "none",
    anchorPosition: "downCenter"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: [_constants.WATCH_TYPES.THRESHOLD, _constants.WATCH_TYPES.JSON].map(function (watchType) {
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        key: watchType,
        "data-test-subj": "".concat(watchType, "WatchCreateLink"),
        onClick: function onClick() {
          setIsPopOverOpen(false);
          var navigate = watchType === _constants.WATCH_TYPES.THRESHOLD ? _navigation.goToCreateThresholdAlert : _navigation.goToCreateAdvancedWatch;
          navigate();
        }
      }, watchType === _constants.WATCH_TYPES.THRESHOLD ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, {
        size: "m"
      }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.createThresholdAlertButtonLabel",
        defaultMessage: "Create threshold alert"
      }))), _react.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued"
      }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.createThresholdAlertButtonTooltip",
        defaultMessage: "Send an alert on a specified condition."
      })))) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, {
        size: "m"
      }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.createAdvancedWatchButtonLabel",
        defaultMessage: "Create advanced watch"
      }))), _react.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued"
      }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.createAdvancedWatchTooltip",
        defaultMessage: "Set up a custom watch in JSON."
      })))));
    })
  }));

  if (isWatchesLoading) {
    return _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchList.loadingWatchesDescription",
      defaultMessage: "Loading watches\u2026"
    }));
  }

  if ((0, _components.getPageErrorCode)(error)) {
    return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_components.PageError, null));
  }

  if (availableWatches && availableWatches.length === 0) {
    var emptyPromptBody = _react.default.createElement(_eui.EuiText, {
      color: "subdued"
    }, _react.default.createElement("p", null, watcherDescriptionText, ' ', _react.default.createElement(_eui.EuiLink, {
      href: watcherGettingStartedUrl,
      target: "_blank"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchList.watcherLearnMoreLinkText",
      defaultMessage: "Learn more."
    }))));

    return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiEmptyPrompt, {
      iconType: "managementApp",
      title: _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.emptyPromptTitle",
        defaultMessage: "You don\u2019t have any watches yet"
      })),
      body: emptyPromptBody,
      actions: createWatchContextMenu,
      "data-test-subj": "emptyPrompt"
    }));
  }

  var content;

  if (error) {
    content = _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.errorTitle",
        defaultMessage: "Error loading watches"
      }),
      error: error
    });
  } else if (availableWatches) {
    var columns = [{
      field: 'id',
      name: _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.idHeader', {
        defaultMessage: 'ID'
      }),
      sortable: true,
      truncateText: true,
      render: function render(id) {
        return _react.default.createElement(_eui.EuiLink, {
          "data-test-subj": "watchIdColumn-".concat(id),
          href: "#/management/elasticsearch/watcher/watches/watch/".concat(id, "/status")
        }, id);
      }
    }, {
      field: 'name',
      name: _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.nameHeader', {
        defaultMessage: 'Name'
      }),
      render: function render(name, item) {
        return _react.default.createElement("span", {
          "data-test-subj": "watchNameColumn-".concat(item.id)
        }, name);
      },
      sortable: true,
      truncateText: true
    }, {
      field: 'watchStatus.state',
      name: _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.stateHeader', {
        defaultMessage: 'State'
      }),
      sortable: true,
      width: '130px',
      render: function render(state) {
        return _react.default.createElement(_components.WatchStatus, {
          status: state
        });
      }
    }, {
      field: 'watchStatus.lastMetCondition',
      name: _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.lastFiredHeader', {
        defaultMessage: 'Last fired'
      }),
      sortable: true,
      truncateText: true,
      width: '130px',
      render: function render(lastMetCondition) {
        return lastMetCondition ? lastMetCondition.fromNow() : lastMetCondition;
      }
    }, {
      field: 'watchStatus.lastChecked',
      name: _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.lastTriggeredHeader', {
        defaultMessage: 'Last triggered'
      }),
      sortable: true,
      truncateText: true,
      width: '130px',
      render: function render(lastChecked) {
        return lastChecked ? lastChecked.fromNow() : lastChecked;
      }
    }, {
      field: 'watchStatus.comment',
      name: _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.commentHeader', {
        defaultMessage: 'Comment'
      }),
      sortable: true,
      truncateText: true
    }, {
      name: _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.actionHeader', {
        defaultMessage: 'Actions'
      }),
      width: '75px',
      actions: [{
        render: function render(watch) {
          var label = _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.actionEditTooltipLabel', {
            defaultMessage: 'Edit'
          });

          return _react.default.createElement(_eui.EuiToolTip, {
            content: label,
            delay: "long"
          }, _react.default.createElement(_eui.EuiButtonIcon, {
            isDisabled: watch.isSystemWatch,
            "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.actionEditAriaLabel', {
              defaultMessage: "Edit watch '{name}'",
              values: {
                name: watch.name
              }
            }),
            iconType: "pencil",
            color: "primary",
            href: "#/management/elasticsearch/watcher/watches/watch/".concat(watch.id, "/edit"),
            "data-test-subj": "editWatchButton"
          }));
        }
      }, {
        render: function render(watch) {
          var label = _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.actionDeleteTooltipLabel', {
            defaultMessage: 'Delete'
          });

          return _react.default.createElement(_eui.EuiToolTip, {
            content: label,
            delay: "long"
          }, _react.default.createElement(_eui.EuiButtonIcon, {
            isDisabled: watch.isSystemWatch,
            "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.actionDeleteAriaLabel', {
              defaultMessage: "Delete watch '{name}'",
              values: {
                name: watch.name
              }
            }),
            iconType: "trash",
            color: "danger",
            onClick: function onClick() {
              setWatchesToDelete([watch.id]);
            },
            "data-test-subj": "deleteWatchButton"
          }));
        }
      }]
    }];
    var selectionConfig = {
      onSelectionChange: setSelection,
      selectable: function selectable(watch) {
        return !watch.isSystemWatch;
      },
      selectableMessage: function selectableMessage(selectable) {
        return !selectable ? _i18n.i18n.translate('xpack.watcher.sections.watchList.watchTable.disabledWatchTooltipText', {
          defaultMessage: 'This watch is read-only'
        }) : '';
      }
    };
    var searchConfig = {
      box: {
        incremental: true
      },
      toolsLeft: selection.length > 0 ? _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "btnDeleteWatches",
        onClick: function onClick() {
          setWatchesToDelete(selection.map(function (selected) {
            return selected.id;
          }));
        },
        color: "danger"
      }, selection.length > 1 ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.deleteMultipleWatchesButtonLabel",
        defaultMessage: "Delete watches"
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.deleteSingleWatchButtonLabel",
        defaultMessage: "Delete watch"
      })) : undefined,
      toolsRight: createWatchContextMenu
    };
    content = _react.default.createElement(_eui.EuiInMemoryTable, {
      items: availableWatches,
      itemId: "id",
      columns: columns,
      search: searchConfig,
      pagination: _constants.PAGINATION,
      sorting: true,
      selection: selectionConfig,
      isSelectable: true,
      message: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchList.watchTable.noWatchesMessage",
        defaultMessage: "No watches to show"
      }),
      rowProps: function rowProps() {
        return {
          'data-test-subj': 'row'
        };
      },
      cellProps: function cellProps() {
        return {
          'data-test-subj': 'cell'
        };
      },
      "data-test-subj": "watchesTable"
    });
  }

  if (content) {
    return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_components.DeleteWatchesModal, {
      callback: function callback(deleted) {
        if (deleted) {
          setDeletedWatches([].concat(_toConsumableArray(deletedWatches), _toConsumableArray(watchesToDelete)));
        }

        setWatchesToDelete([]);
      },
      watchesToDelete: watchesToDelete
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "l"
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }, _react.default.createElement("h1", {
      "data-test-subj": "appTitle"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchList.header",
      defaultMessage: "Watcher"
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      href: watcherGettingStartedUrl,
      target: "_blank",
      iconType: "help",
      "data-test-subj": "documentationLink"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchList.watcherGettingStartedDocsLinkText",
      defaultMessage: "Watcher docs"
    }))))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiText, {
      color: "subdued"
    }, _react.default.createElement("p", null, watcherDescriptionText)), _react.default.createElement(_eui.EuiSpacer, {
      size: "xl"
    }), content);
  }

  return null;
};

exports.WatchList = WatchList;