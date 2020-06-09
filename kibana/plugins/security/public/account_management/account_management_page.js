"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAccountManagementPage = renderAccountManagementPage;
exports.AccountManagementPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _eui = require("@elastic/eui");

var _model = require("../../common/model");

var _change_password = require("./change_password");

var _personal_info = require("./personal_info");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AccountManagementPage = function AccountManagementPage(_ref) {
  var userAPIClient = _ref.userAPIClient,
      authc = _ref.authc,
      notifications = _ref.notifications;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentUser = _useState2[0],
      setCurrentUser = _useState2[1];

  (0, _react.useEffect)(function () {
    authc.getCurrentUser().then(setCurrentUser);
  }, [authc]);

  if (!currentUser) {
    return null;
  }

  return _react.default.createElement(_eui.EuiPage, null, _react.default.createElement(_eui.EuiPageBody, {
    restrictWidth: true
  }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiText, {
    "data-test-subj": 'userDisplayName'
  }, _react.default.createElement("h1", null, (0, _model.getUserDisplayName)(currentUser))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_personal_info.PersonalInfo, {
    user: currentUser
  }), _react.default.createElement(_change_password.ChangePassword, {
    user: currentUser,
    userAPIClient: userAPIClient,
    notifications: notifications
  }))));
};

exports.AccountManagementPage = AccountManagementPage;

function renderAccountManagementPage(i18nStart, element, props) {
  _reactDom.default.render(_react.default.createElement(i18nStart.Context, null, _react.default.createElement(AccountManagementPage, props)), element);

  return function () {
    return _reactDom.default.unmountComponentAtNode(element);
  };
}