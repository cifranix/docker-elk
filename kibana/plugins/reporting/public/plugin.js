"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportingPublicPlugin = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _operators = require("rxjs/operators");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _report_listing = require("./components/report_listing");

var _components = require("./components");

var _stream_handler = require("./lib/stream_handler");

var _reporting_api_client = require("./lib/reporting_api_client");

var _get_csv_panel_action = require("./panel_actions/get_csv_panel_action");

var _register_csv_reporting = require("./share_context_menu/register_csv_reporting");

var _register_pdf_png_reporting = require("./share_context_menu/register_pdf_png_reporting");

var _public = require("../../../../src/plugins/embeddable/public");

var _public2 = require("../../../../src/plugins/home/public");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JOBS_REFRESH_INTERVAL = _constants.JOB_COMPLETION_NOTIFICATIONS_POLLER_CONFIG.jobCompletionNotifier.interval;

function getStored() {
  var sessionValue = sessionStorage.getItem(_constants.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY);
  return sessionValue ? JSON.parse(sessionValue) : [];
}

function handleError(notifications, err) {
  notifications.toasts.addDanger((0, _components.getGeneralErrorToast)(_i18n.i18n.translate('xpack.reporting.publicNotifier.pollingErrorMessage', {
    defaultMessage: 'Reporting notifier error!'
  }), err));
  window.console.error(err);
  return Rx.of({
    completed: [],
    failed: []
  });
}

var ReportingPublicPlugin =
/*#__PURE__*/
function () {
  function ReportingPublicPlugin(initializerContext) {
    _classCallCheck(this, ReportingPublicPlugin);

    _defineProperty(this, "stop$", new Rx.ReplaySubject(1));

    _defineProperty(this, "title", _i18n.i18n.translate('xpack.reporting.management.reportingTitle', {
      defaultMessage: 'Reporting'
    }));

    _defineProperty(this, "breadcrumbText", _i18n.i18n.translate('xpack.reporting.breadcrumb', {
      defaultMessage: 'Reporting'
    }));
  }

  _createClass(ReportingPublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var home = _ref.home,
          management = _ref.management,
          licensing = _ref.licensing,
          uiActions = _ref.uiActions,
          share = _ref.share;
      var http = core.http,
          toasts = core.notifications.toasts,
          getStartServices = core.getStartServices,
          uiSettings = core.uiSettings;
      var license$ = licensing.license$;
      var apiClient = new _reporting_api_client.ReportingAPIClient(http);
      var action = new _get_csv_panel_action.GetCsvReportPanelAction(core, license$);
      home.featureCatalogue.register({
        id: 'reporting',
        title: _i18n.i18n.translate('xpack.reporting.registerFeature.reportingTitle', {
          defaultMessage: 'Reporting'
        }),
        description: _i18n.i18n.translate('xpack.reporting.registerFeature.reportingDescription', {
          defaultMessage: 'Manage your reports generated from Discover, Visualize, and Dashboard.'
        }),
        icon: 'reportingApp',
        path: '/app/kibana#/management/kibana/reporting',
        showOnHomePage: false,
        category: _public2.FeatureCatalogueCategory.ADMIN
      });
      management.sections.getSection('kibana').registerApp({
        id: 'reporting',
        title: this.title,
        order: 15,
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var _ref2, _ref3, start;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return getStartServices();

                  case 2:
                    _ref2 = _context.sent;
                    _ref3 = _slicedToArray(_ref2, 1);
                    start = _ref3[0];
                    params.setBreadcrumbs([{
                      text: _this.breadcrumbText
                    }]);

                    _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_report_listing.ReportListing, {
                      toasts: toasts,
                      license$: license$,
                      redirect: start.application.navigateToApp,
                      apiClient: apiClient
                    })), params.element);

                    return _context.abrupt("return", function () {
                      _reactDom.default.unmountComponentAtNode(params.element);
                    });

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function mount(_x) {
            return _mount.apply(this, arguments);
          }

          return mount;
        }()
      });
      uiActions.registerAction(action);
      uiActions.attachAction(_public.CONTEXT_MENU_TRIGGER, action);
      share.register((0, _register_csv_reporting.csvReportingProvider)({
        apiClient: apiClient,
        toasts: toasts,
        license$: license$
      }));
      share.register((0, _register_pdf_png_reporting.reportingPDFPNGProvider)({
        apiClient: apiClient,
        toasts: toasts,
        license$: license$,
        uiSettings: uiSettings
      }));
    } // FIXME: only perform these actions for authenticated routes
    // Depends on https://github.com/elastic/kibana/pull/39477

  }, {
    key: "start",
    value: function start(core) {
      var http = core.http,
          notifications = core.notifications;
      var apiClient = new _reporting_api_client.ReportingAPIClient(http);
      var streamHandler = new _stream_handler.ReportingNotifierStreamHandler(notifications, apiClient);
      Rx.timer(0, JOBS_REFRESH_INTERVAL).pipe((0, _operators.takeUntil)(this.stop$), // stop the interval when stop method is called
      (0, _operators.map)(function () {
        return getStored();
      }), // read all pending job IDs from session storage
      (0, _operators.filter)(function (storedJobs) {
        return storedJobs.length > 0;
      }), // stop the pipeline here if there are none pending
      (0, _operators.mergeMap)(function (storedJobs) {
        return streamHandler.findChangedStatusJobs(storedJobs);
      }), // look up the latest status of all pending jobs on the server
      (0, _operators.mergeMap)(function (_ref4) {
        var completed = _ref4.completed,
            failed = _ref4.failed;
        return streamHandler.showNotifications({
          completed: completed,
          failed: failed
        });
      }), (0, _operators.catchError)(function (err) {
        return handleError(notifications, err);
      })).subscribe();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stop$.next();
    }
  }]);

  return ReportingPublicPlugin;
}();

exports.ReportingPublicPlugin = ReportingPublicPlugin;