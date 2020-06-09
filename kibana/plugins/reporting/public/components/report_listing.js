"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportListing = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireWildcard(require("react"));

var _poller = require("../../common/poller");

var _constants = require("../../constants");

var _license_check = require("../lib/license_check");

var _buttons = require("./buttons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var jobStatusLabelsMap = new Map([[_constants.JobStatuses.PENDING, _i18n.i18n.translate('xpack.reporting.jobStatuses.pendingText', {
  defaultMessage: 'Pending'
})], [_constants.JobStatuses.PROCESSING, _i18n.i18n.translate('xpack.reporting.jobStatuses.processingText', {
  defaultMessage: 'Processing'
})], [_constants.JobStatuses.COMPLETED, _i18n.i18n.translate('xpack.reporting.jobStatuses.completedText', {
  defaultMessage: 'Completed'
})], [_constants.JobStatuses.FAILED, _i18n.i18n.translate('xpack.reporting.jobStatuses.failedText', {
  defaultMessage: 'Failed'
})], [_constants.JobStatuses.CANCELLED, _i18n.i18n.translate('xpack.reporting.jobStatuses.cancelledText', {
  defaultMessage: 'Cancelled'
})]]);

var ReportListingUi =
/*#__PURE__*/
function (_Component) {
  _inherits(ReportListingUi, _Component);

  function ReportListingUi(props) {
    var _this;

    _classCallCheck(this, ReportListingUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReportListingUi).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isInitialJobsFetch", void 0);

    _defineProperty(_assertThisInitialized(_this), "licenseSubscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "mounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "poller", void 0);

    _defineProperty(_assertThisInitialized(_this), "licenseHandler", function (license) {
      var _checkLicense = (0, _license_check.checkLicense)(license.check('reporting', 'basic')),
          enableLinks = _checkLicense.enableLinks,
          showLinks = _checkLicense.showLinks,
          badLicenseMessage = _checkLicense.message;

      _this.setState({
        enableLinks: enableLinks,
        showLinks: showLinks,
        badLicenseMessage: badLicenseMessage
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectionChange", function (jobs) {
      _this.setState(function (current) {
        return _objectSpread({}, current, {
          selectedJobs: jobs
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "removeRecord", function (record) {
      var jobs = _this.state.jobs;
      var filtered = jobs.filter(function (j) {
        return j.id !== record.id;
      });

      _this.setState(function (current) {
        return _objectSpread({}, current, {
          jobs: filtered
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderDeleteButton", function () {
      var selectedJobs = _this.state.selectedJobs;
      if (selectedJobs.length === 0) return undefined;

      var performDelete =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, record;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 3;
                  _iterator = selectedJobs[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 21;
                    break;
                  }

                  record = _step.value;
                  _context.prev = 7;
                  _context.next = 10;
                  return _this.props.apiClient.deleteReport(record.id);

                case 10:
                  _this.removeRecord(record);

                  _this.props.toasts.addSuccess(_this.props.intl.formatMessage({
                    id: 'xpack.reporting.listing.table.deleteConfim',
                    defaultMessage: "The {reportTitle} report was deleted"
                  }, {
                    reportTitle: record.object_title
                  }));

                  _context.next = 18;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](7);

                  _this.props.toasts.addDanger(_this.props.intl.formatMessage({
                    id: 'xpack.reporting.listing.table.deleteFailedErrorMessage',
                    defaultMessage: "The report was not deleted: {error}"
                  }, {
                    error: _context.t0
                  }));

                  throw _context.t0;

                case 18:
                  _iteratorNormalCompletion = true;
                  _context.next = 5;
                  break;

                case 21:
                  _context.next = 27;
                  break;

                case 23:
                  _context.prev = 23;
                  _context.t1 = _context["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = _context.t1;

                case 27:
                  _context.prev = 27;
                  _context.prev = 28;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 30:
                  _context.prev = 30;

                  if (!_didIteratorError) {
                    _context.next = 33;
                    break;
                  }

                  throw _iteratorError;

                case 33:
                  return _context.finish(30);

                case 34:
                  return _context.finish(27);

                case 35:
                  // Since the contents of the table have changed, we must reset the pagination
                  // and re-fetch. Otherwise, the Nth page we are on could be empty of jobs.
                  _this.setState(function () {
                    return {
                      page: 0
                    };
                  }, _this.fetchJobs);

                case 36:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[3, 23, 27, 35], [7, 14], [28,, 30, 34]]);
        }));

        return function performDelete() {
          return _ref.apply(this, arguments);
        };
      }();

      return _react2.default.createElement(_buttons.ReportDeleteButton, _extends({
        jobsToDelete: selectedJobs,
        performDelete: performDelete
      }, _this.props));
    });

    _defineProperty(_assertThisInitialized(_this), "onTableChange", function (_ref2) {
      var page = _ref2.page;
      var pageIndex = page.index;

      _this.setState(function () {
        return {
          page: pageIndex
        };
      }, _this.fetchJobs);
    });

    _defineProperty(_assertThisInitialized(_this), "fetchJobs",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var jobs, total;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // avoid page flicker when poller is updating table - only display loading screen on first load
              if (_this.isInitialJobsFetch) {
                _this.setState(function () {
                  return {
                    isLoading: true
                  };
                });
              }

              _context2.prev = 1;
              _context2.next = 4;
              return _this.props.apiClient.list(_this.state.page);

            case 4:
              jobs = _context2.sent;
              _context2.next = 7;
              return _this.props.apiClient.total();

            case 7:
              total = _context2.sent;
              _this.isInitialJobsFetch = false;
              _context2.next = 20;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);

              if (_this.licenseAllowsToShowThisPage()) {
                _context2.next = 17;
                break;
              }

              _this.props.toasts.addDanger(_this.state.badLicenseMessage);

              _this.props.redirect('kibana#/management');

              return _context2.abrupt("return");

            case 17:
              if (_context2.t0.message === 'Failed to fetch') {
                _this.props.toasts.addDanger(_context2.t0.message || _this.props.intl.formatMessage({
                  id: 'xpack.reporting.listing.table.requestFailedErrorMessage',
                  defaultMessage: 'Request failed'
                }));
              }

              if (_this.mounted) {
                _this.setState(function () {
                  return {
                    isLoading: false,
                    jobs: [],
                    total: 0
                  };
                });
              }

              return _context2.abrupt("return");

            case 20:
              if (_this.mounted) {
                _this.setState(function () {
                  return {
                    isLoading: false,
                    total: total,
                    jobs: jobs.map(function (job) {
                      var source = job._source;
                      return {
                        id: job._id,
                        type: source.jobtype,
                        object_type: source.payload.type,
                        object_title: source.payload.title,
                        created_by: source.created_by,
                        created_at: source.created_at,
                        started_at: source.started_at,
                        completed_at: source.completed_at,
                        status: source.status,
                        statusLabel: jobStatusLabelsMap.get(source.status) || source.status,
                        max_size_reached: source.output ? source.output.max_size_reached : false,
                        attempts: source.attempts,
                        max_attempts: source.max_attempts,
                        csv_contains_formulas: (0, _lodash.get)(source, 'output.csv_contains_formulas'),
                        warnings: source.output ? source.output.warnings : undefined
                      };
                    })
                  };
                });
              }

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 11]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "licenseAllowsToShowThisPage", function () {
      return _this.state.showLinks && _this.state.enableLinks;
    });

    _this.state = {
      page: 0,
      total: 0,
      jobs: [],
      selectedJobs: [],
      isLoading: false,
      showLinks: false,
      enableLinks: false,
      badLicenseMessage: ''
    };
    _this.isInitialJobsFetch = true;
    return _this;
  }

  _createClass(ReportListingUi, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_eui.EuiPageContent, {
        horizontalPosition: "center",
        className: "euiPageBody--restrictWidth-default"
      }, _react2.default.createElement(_eui.EuiTitle, null, _react2.default.createElement("h1", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.reporting.listing.reportstitle",
        defaultMessage: "Reports"
      }))), _react2.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "s"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.reporting.listing.reports.subtitle",
        defaultMessage: "Find reports generated in Kibana applications here"
      }))), _react2.default.createElement(_eui.EuiSpacer, null), this.renderTable());
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      this.poller.stop();

      if (this.licenseSubscription) {
        this.licenseSubscription.unsubscribe();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      this.poller = new _poller.Poller({
        functionToPoll: function functionToPoll() {
          return _this2.fetchJobs();
        },
        pollFrequencyInMillis: _constants.JOB_COMPLETION_NOTIFICATIONS_POLLER_CONFIG.jobCompletionNotifier.interval,
        trailing: false,
        continuePollingOnError: true,
        pollFrequencyErrorMultiplier: _constants.JOB_COMPLETION_NOTIFICATIONS_POLLER_CONFIG.jobCompletionNotifier.intervalErrorMultiplier
      });
      this.poller.start();
      this.licenseSubscription = this.props.license$.subscribe(this.licenseHandler);
    }
  }, {
    key: "formatDate",
    value: function formatDate(timestamp) {
      try {
        return (0, _moment.default)(timestamp).format('YYYY-MM-DD @ hh:mm A');
      } catch (error) {
        // ignore parse error and display unformatted value
        return timestamp;
      }
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this3 = this;

      var intl = this.props.intl;
      var tableColumns = [{
        field: 'object_title',
        name: intl.formatMessage({
          id: 'xpack.reporting.listing.tableColumns.reportTitle',
          defaultMessage: 'Report'
        }),
        render: function render(objectTitle, record) {
          return _react2.default.createElement("div", null, _react2.default.createElement("div", null, objectTitle), _react2.default.createElement(_eui.EuiText, {
            size: "s"
          }, _react2.default.createElement(_eui.EuiTextColor, {
            color: "subdued"
          }, record.object_type)));
        }
      }, {
        field: 'created_at',
        name: intl.formatMessage({
          id: 'xpack.reporting.listing.tableColumns.createdAtTitle',
          defaultMessage: 'Created at'
        }),
        render: function render(createdAt, record) {
          if (record.created_by) {
            return _react2.default.createElement("div", null, _react2.default.createElement("div", null, _this3.formatDate(createdAt)), _react2.default.createElement("span", null, record.created_by));
          }

          return _this3.formatDate(createdAt);
        }
      }, {
        field: 'status',
        name: intl.formatMessage({
          id: 'xpack.reporting.listing.tableColumns.statusTitle',
          defaultMessage: 'Status'
        }),
        render: function render(status, record) {
          if (status === 'pending') {
            return _react2.default.createElement("div", null, _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.reporting.listing.tableValue.statusDetail.pendingStatusReachedText",
              defaultMessage: "Pending - waiting for job to be processed"
            }));
          }

          var maxSizeReached;

          if (record.max_size_reached) {
            maxSizeReached = _react2.default.createElement("span", null, _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.reporting.listing.tableValue.statusDetail.maxSizeReachedText",
              defaultMessage: " - Max size reached"
            }));
          }

          var warnings;

          if (record.warnings) {
            warnings = _react2.default.createElement(_eui.EuiText, {
              size: "s"
            }, _react2.default.createElement(_eui.EuiTextColor, {
              color: "subdued"
            }, _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.reporting.listing.tableValue.statusDetail.warningsText",
              defaultMessage: "Errors occurred: see job info for details."
            })));
          }

          var statusTimestamp;

          if (status === _constants.JobStatuses.PROCESSING && record.started_at) {
            statusTimestamp = _this3.formatDate(record.started_at);
          } else if (record.completed_at && (status === _constants.JobStatuses.COMPLETED || status === _constants.JobStatuses.FAILED)) {
            statusTimestamp = _this3.formatDate(record.completed_at);
          }

          var statusLabel = jobStatusLabelsMap.get(status) || status;

          if (status === _constants.JobStatuses.PROCESSING) {
            statusLabel = statusLabel + " (attempt ".concat(record.attempts, " of ").concat(record.max_attempts, ")");
          }

          if (statusTimestamp) {
            return _react2.default.createElement("div", null, _react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.reporting.listing.tableValue.statusDetail.statusTimestampText",
              defaultMessage: "{statusLabel} at {statusTimestamp}",
              values: {
                statusLabel: statusLabel,
                statusTimestamp: _react2.default.createElement("span", {
                  className: "eui-textNoWrap"
                }, statusTimestamp)
              }
            }), maxSizeReached, warnings);
          } // unknown status


          return _react2.default.createElement("div", null, statusLabel, maxSizeReached);
        }
      }, {
        name: intl.formatMessage({
          id: 'xpack.reporting.listing.tableColumns.actionsTitle',
          defaultMessage: 'Actions'
        }),
        actions: [{
          render: function render(record) {
            return _react2.default.createElement("div", null, _react2.default.createElement(_buttons.ReportDownloadButton, _extends({}, _this3.props, {
              record: record
            })), _react2.default.createElement(_buttons.ReportErrorButton, _extends({}, _this3.props, {
              record: record
            })), _react2.default.createElement(_buttons.ReportInfoButton, _extends({}, _this3.props, {
              jobId: record.id
            })));
          }
        }]
      }];
      var pagination = {
        pageIndex: this.state.page,
        pageSize: 10,
        totalItemCount: this.state.total,
        hidePerPageOptions: true
      };
      var selection = {
        itemId: 'id',
        onSelectionChange: this.onSelectionChange
      };
      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiBasicTable, {
        itemId: "id",
        items: this.state.jobs,
        loading: this.state.isLoading,
        columns: tableColumns,
        noItemsMessage: this.state.isLoading ? intl.formatMessage({
          id: 'xpack.reporting.listing.table.loadingReportsDescription',
          defaultMessage: 'Loading reports'
        }) : intl.formatMessage({
          id: 'xpack.reporting.listing.table.noCreatedReportsDescription',
          defaultMessage: 'No reports have been created'
        }),
        pagination: pagination,
        selection: selection,
        isSelectable: true,
        onChange: this.onTableChange,
        "data-test-subj": "reportJobListing"
      }), this.state.selectedJobs.length > 0 ? this.renderDeleteButton() : null);
    }
  }]);

  return ReportListingUi;
}(_react2.Component);

var ReportListing = (0, _react.injectI18n)(ReportListingUi);
exports.ReportListing = ReportListing;