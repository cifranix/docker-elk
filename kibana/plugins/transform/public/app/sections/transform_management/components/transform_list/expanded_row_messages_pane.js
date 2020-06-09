"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandedRowMessagesPane = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _format = require("@elastic/eui/lib/services/format");

var _i18n = require("@kbn/i18n");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _use_api = require("../../../../hooks/use_api");

var _job_icon = require("../../../../components/job_icon");

var _common = require("../../../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

var ExpandedRowMessagesPane = function ExpandedRowMessagesPane(_ref) {
  var transformId = _ref.transformId;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      messages = _useState2[0],
      setMessages = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      errorMessage = _useState6[0],
      setErrorMessage = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      pageIndex = _useState8[0],
      setPageIndex = _useState8[1];

  var _useState9 = (0, _react.useState)(10),
      _useState10 = _slicedToArray(_useState9, 2),
      pageSize = _useState10[0],
      setPageSize = _useState10[1];

  var api = (0, _use_api.useApi)();

  var getMessagesFactory = function getMessagesFactory() {
    var concurrentLoads = 0;
    return (
      /*#__PURE__*/
      function () {
        var _getMessages = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var messagesResp;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  concurrentLoads++;

                  if (!(concurrentLoads > 1)) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt("return");

                case 4:
                  setIsLoading(true);
                  _context.next = 7;
                  return api.getTransformAuditMessages(transformId);

                case 7:
                  messagesResp = _context.sent;
                  setIsLoading(false);
                  setMessages(messagesResp);
                  concurrentLoads--;

                  if (concurrentLoads > 0) {
                    concurrentLoads = 0;
                    getMessages();
                  }

                  _context.next = 18;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](0);
                  setIsLoading(false);
                  setErrorMessage(_i18n.i18n.translate('xpack.transform.transformList.transformDetails.messagesPane.errorMessage', {
                    defaultMessage: 'Messages could not be loaded'
                  }));

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 14]]);
        }));

        function getMessages() {
          return _getMessages.apply(this, arguments);
        }

        return getMessages;
      }()
    );
  };

  (0, _common.useRefreshTransformList)({
    onRefresh: getMessagesFactory()
  });
  var columns = [{
    name: '',
    render: function render(message) {
      return _react.default.createElement(_job_icon.JobIcon, {
        message: message
      });
    },
    width: "".concat(_eui_theme_light.default.euiSizeXL, "px")
  }, {
    name: _i18n.i18n.translate('xpack.transform.transformList.transformDetails.messagesPane.timeLabel', {
      defaultMessage: 'Time'
    }),
    render: function render(message) {
      return (0, _format.formatDate)(message.timestamp, TIME_FORMAT);
    }
  }, {
    field: 'node_name',
    name: _i18n.i18n.translate('xpack.transform.transformList.transformDetails.messagesPane.nodeLabel', {
      defaultMessage: 'Node'
    })
  }, {
    field: 'message',
    name: _i18n.i18n.translate('xpack.transform.transformList.transformDetails.messagesPane.messageLabel', {
      defaultMessage: 'Message'
    }),
    width: '50%'
  }];

  var getPageOfMessages = function getPageOfMessages(_ref2) {
    var index = _ref2.index,
        size = _ref2.size;
    var list = messages;
    var listLength = list.length;
    var pageStart = index * size;
    return {
      pageOfMessages: list.slice(pageStart, pageStart + size),
      totalItemCount: listLength
    };
  };

  var onChange = function onChange(_ref3) {
    var _ref3$page = _ref3.page,
        page = _ref3$page === void 0 ? {
      index: 0,
      size: 10
    } : _ref3$page;
    var index = page.index,
        size = page.size;
    setPageIndex(index);
    setPageSize(size);
  };

  var _getPageOfMessages = getPageOfMessages({
    index: pageIndex,
    size: pageSize
  }),
      pageOfMessages = _getPageOfMessages.pageOfMessages,
      totalItemCount = _getPageOfMessages.totalItemCount;

  var pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [10, 20, 50],
    hidePerPageOptions: false
  };
  return _react.default.createElement("div", {
    "data-test-subj": "transformMessagesTabContent"
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiBasicTable, {
    className: "transform__TransformTable__messagesPaneTable",
    items: pageOfMessages,
    columns: columns,
    compressed: true,
    loading: isLoading,
    error: errorMessage,
    pagination: pagination,
    onChange: onChange
  }));
};

exports.ExpandedRowMessagesPane = ExpandedRowMessagesPane;