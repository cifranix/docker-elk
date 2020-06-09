"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HealthCheck = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Option = require("fp-ts/lib/Option");

var _pipeable = require("fp-ts/lib/pipeable");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _alert_api = require("../lib/alert_api");

require("./health_check.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HealthCheck = function HealthCheck(_ref) {
  var docLinks = _ref.docLinks,
      http = _ref.http,
      children = _ref.children,
      _ref$inFlyout = _ref.inFlyout,
      inFlyout = _ref$inFlyout === void 0 ? false : _ref$inFlyout;

  var _React$useState = _react.default.useState(_Option.none),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      alertingHealth = _React$useState2[0],
      setAlertingHealth = _React$useState2[1];

  _react.default.useEffect(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = setAlertingHealth;
              _context.t1 = _Option.some;
              _context.next = 4;
              return (0, _alert_api.health)({
                http: http
              });

            case 4:
              _context.t2 = _context.sent;
              _context.t3 = (0, _context.t1)(_context.t2);
              (0, _context.t0)(_context.t3);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, [http]);

  var className = inFlyout ? 'alertingFlyoutHealthCheck' : 'alertingHealthCheck';
  return (0, _pipeable.pipe)(alertingHealth, (0, _Option.fold)(function () {
    return _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "m"
    });
  }, function (healthCheck) {
    return (healthCheck === null || healthCheck === void 0 ? void 0 : healthCheck.isSufficientlySecure) && (healthCheck === null || healthCheck === void 0 ? void 0 : healthCheck.hasPermanentEncryptionKey) ? _react.default.createElement(_react.Fragment, null, children) : !healthCheck.isSufficientlySecure && !healthCheck.hasPermanentEncryptionKey ? _react.default.createElement(TlsAndEncryptionError, {
      docLinks: docLinks,
      className: className
    }) : !healthCheck.hasPermanentEncryptionKey ? _react.default.createElement(EncryptionError, {
      docLinks: docLinks,
      className: className
    }) : _react.default.createElement(TlsError, {
      docLinks: docLinks,
      className: className
    });
  }));
};

exports.HealthCheck = HealthCheck;

var TlsAndEncryptionError = function TlsAndEncryptionError(_ref3) {
  var _ref3$docLinks = _ref3.docLinks,
      ELASTIC_WEBSITE_URL = _ref3$docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = _ref3$docLinks.DOC_LINK_VERSION,
      className = _ref3.className;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "watchesApp",
    "data-test-subj": "actionNeededEmptyPrompt",
    className: className,
    titleSize: "xs",
    title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.healthCheck.tlsAndEncryptionErrorTitle",
      defaultMessage: "Additional setup required"
    })),
    body: _react.default.createElement("div", {
      className: "".concat(className, "__body")
    }, _react.default.createElement("p", {
      role: "banner"
    }, _i18n.i18n.translate('xpack.triggersActionsUI.components.healthCheck.tlsAndEncryptionError', {
      defaultMessage: 'You must enable Transport Layer Security between Kibana and Elasticsearch and configure an encryption key in your kibana.yml file. '
    }), _react.default.createElement(_eui.EuiLink, {
      href: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/alerting-getting-started.html#alerting-setup-prerequisites"),
      external: true,
      target: "_blank"
    }, _i18n.i18n.translate('xpack.triggersActionsUI.components.healthCheck.tlsAndEncryptionErrorAction', {
      defaultMessage: 'Learn how'
    }))))
  });
};

var EncryptionError = function EncryptionError(_ref4) {
  var _ref4$docLinks = _ref4.docLinks,
      ELASTIC_WEBSITE_URL = _ref4$docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = _ref4$docLinks.DOC_LINK_VERSION,
      className = _ref4.className;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "watchesApp",
    "data-test-subj": "actionNeededEmptyPrompt",
    className: className,
    titleSize: "xs",
    title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.healthCheck.encryptionErrorTitle",
      defaultMessage: "You must set an encryption key"
    })),
    body: _react.default.createElement("div", {
      className: "".concat(className, "__body")
    }, _react.default.createElement("p", {
      role: "banner"
    }, _i18n.i18n.translate('xpack.triggersActionsUI.components.healthCheck.encryptionErrorBeforeKey', {
      defaultMessage: 'To create an alert, set a value for '
    }), _react.default.createElement(_eui.EuiCode, null, 'xpack.encryptedSavedObjects.encryptionKey'), _i18n.i18n.translate('xpack.triggersActionsUI.components.healthCheck.encryptionErrorAfterKey', {
      defaultMessage: ' in your kibana.yml file. '
    }), _react.default.createElement(_eui.EuiLink, {
      href: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/alert-action-settings-kb.html#general-alert-action-settings"),
      external: true,
      target: "_blank"
    }, _i18n.i18n.translate('xpack.triggersActionsUI.components.healthCheck.encryptionErrorAction', {
      defaultMessage: 'Learn how.'
    }))))
  });
};

var TlsError = function TlsError(_ref5) {
  var _ref5$docLinks = _ref5.docLinks,
      ELASTIC_WEBSITE_URL = _ref5$docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = _ref5$docLinks.DOC_LINK_VERSION,
      className = _ref5.className;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "watchesApp",
    "data-test-subj": "actionNeededEmptyPrompt",
    className: className,
    titleSize: "xs",
    title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.healthCheck.tlsErrorTitle",
      defaultMessage: "You must enable Transport Layer Security"
    })),
    body: _react.default.createElement("div", {
      className: "".concat(className, "__body")
    }, _react.default.createElement("p", {
      role: "banner"
    }, _i18n.i18n.translate('xpack.triggersActionsUI.components.healthCheck.tlsError', {
      defaultMessage: 'Alerting relies on API keys, which require TLS between Elasticsearch and Kibana. '
    }), _react.default.createElement(_eui.EuiLink, {
      href: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/configuring-tls.html"),
      external: true,
      target: "_blank"
    }, _i18n.i18n.translate('xpack.triggersActionsUI.components.healthCheck.tlsErrorAction', {
      defaultMessage: 'Learn how to enable TLS.'
    }))))
  });
};