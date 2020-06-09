"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarsSelection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _job_creator_context = require("../../../../../job_creator_context");

var _description = require("./description");

var _ml_api_service = require("../../../../../../../../../services/ml_api_service");

var _calendars = require("../../../../../../../../../../../common/constants/calendars");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CalendarsSelection = function CalendarsSelection() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate;

  var _useState = (0, _react.useState)(jobCreator.calendars),
      _useState2 = _slicedToArray(_useState, 2),
      selectedCalendars = _useState2[0],
      setSelectedCalendars = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedOptions = _useState4[0],
      setSelectedOptions = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      options = _useState6[0],
      setOptions = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isLoading = _useState8[0],
      setIsLoading = _useState8[1];

  function loadCalendars() {
    return _loadCalendars.apply(this, arguments);
  }

  function _loadCalendars() {
    _loadCalendars = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var calendars;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.next = 3;
              return _ml_api_service.ml.calendars();

            case 3:
              _context.t0 = function (c) {
                return c.job_ids.includes(_calendars.GLOBAL_CALENDAR) === false;
              };

              calendars = _context.sent.filter(_context.t0);
              setOptions(calendars.map(function (c) {
                return {
                  label: c.calendar_id,
                  value: c
                };
              }));
              setSelectedOptions(selectedCalendars.map(function (c) {
                return {
                  label: c.calendar_id,
                  value: c
                };
              }));
              setIsLoading(false);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _loadCalendars.apply(this, arguments);
  }

  (0, _react.useEffect)(function () {
    loadCalendars();
  }, []);
  (0, _react.useEffect)(function () {
    jobCreator.calendars = selectedCalendars;
    jobCreatorUpdate();
  }, [selectedCalendars.join()]);
  var comboBoxProps = {
    async: true,
    options: options,
    selectedOptions: selectedOptions,
    isLoading: isLoading,
    onChange: function onChange(optionsIn) {
      setSelectedOptions(optionsIn);
      setSelectedCalendars(optionsIn.map(function (o) {
        return o.value;
      }));
    }
  };
  var manageCalendarsHref = '#/settings/calendars_list';
  return _react.default.createElement(_description.Description, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiComboBox, _extends({}, comboBoxProps, {
    "data-test-subj": "mlJobWizardComboBoxCalendars"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "right",
    content: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.jobDetailsStep.additionalSection.calendarsSelection.refreshCalendarsButtonLabel",
      defaultMessage: "Refresh calendars"
    })
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "refresh",
    color: "primary",
    "aria-label": _i18n.i18n.translate('xpack.ml.newJob.wizard.jobDetailsStep.additionalSection.calendarsSelection.refreshCalendarsButtonLabel', {
      defaultMessage: 'Refresh calendars'
    }),
    onClick: loadCalendars
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_eui.EuiLink, {
    href: manageCalendarsHref,
    target: "_blank",
    external: true
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobDetailsStep.additionalSection.calendarsSelection.manageCalendarsButtonLabel",
    defaultMessage: "Manage calendars"
  }))));
};

exports.CalendarsSelection = CalendarsSelection;