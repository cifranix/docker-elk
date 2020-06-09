"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnalysisSetupState = void 0;

var _react = require("react");

var _log_analysis = require("../../../../common/log_analysis");

var _use_tracked_promise = require("../../../utils/use_tracked_promise");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fourWeeksInMs = 86400000 * 7 * 4;

var useAnalysisSetupState = function useAnalysisSetupState(_ref) {
  var cleanUpAndSetUpModule = _ref.cleanUpAndSetUpModule,
      validateSetupIndices = _ref.moduleDescriptor.validateSetupIndices,
      setUpModule = _ref.setUpModule,
      sourceConfiguration = _ref.sourceConfiguration;

  var _useState = (0, _react.useState)(Date.now() - fourWeeksInMs),
      _useState2 = _slicedToArray(_useState, 2),
      startTime = _useState2[0],
      setStartTime = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      endTime = _useState4[0],
      setEndTime = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      validatedIndices = _useState6[0],
      setValidatedIndices = _useState6[1];

  var _useTrackedPromise = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'resolution',
    createPromise: function () {
      var _createPromise = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return validateSetupIndices(sourceConfiguration);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPromise() {
        return _createPromise.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(_ref2) {
      var errors = _ref2.data.errors;
      setValidatedIndices(function (previousValidatedIndices) {
        return sourceConfiguration.indices.map(function (indexName) {
          var previousValidatedIndex = previousValidatedIndices.filter(function (_ref3) {
            var name = _ref3.name;
            return name === indexName;
          })[0];
          var indexValiationErrors = errors.filter(function (_ref4) {
            var index = _ref4.index;
            return index === indexName;
          });

          if (indexValiationErrors.length > 0) {
            return {
              validity: 'invalid',
              name: indexName,
              errors: indexValiationErrors
            };
          } else {
            return {
              validity: 'valid',
              name: indexName,
              isSelected: (previousValidatedIndex === null || previousValidatedIndex === void 0 ? void 0 : previousValidatedIndex.validity) === 'valid' ? previousValidatedIndex === null || previousValidatedIndex === void 0 ? void 0 : previousValidatedIndex.isSelected : !(0, _log_analysis.isExampleDataIndex)(indexName)
            };
          }
        });
      });
    },
    onReject: function onReject() {
      setValidatedIndices([]);
    }
  }, [sourceConfiguration.indices]),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      validateIndicesRequest = _useTrackedPromise2[0],
      validateIndices = _useTrackedPromise2[1];

  (0, _react.useEffect)(function () {
    validateIndices();
  }, [validateIndices]);
  var selectedIndexNames = (0, _react.useMemo)(function () {
    return validatedIndices.filter(function (index) {
      return index.validity === 'valid' && index.isSelected;
    }).map(function (i) {
      return i.name;
    });
  }, [validatedIndices]);
  var setUp = (0, _react.useCallback)(function () {
    return setUpModule(selectedIndexNames, startTime, endTime);
  }, [setUpModule, selectedIndexNames, startTime, endTime]);
  var cleanUpAndSetUp = (0, _react.useCallback)(function () {
    return cleanUpAndSetUpModule(selectedIndexNames, startTime, endTime);
  }, [cleanUpAndSetUpModule, selectedIndexNames, startTime, endTime]);
  var isValidating = (0, _react.useMemo)(function () {
    return validateIndicesRequest.state === 'pending' || validateIndicesRequest.state === 'uninitialized';
  }, [validateIndicesRequest.state]);
  var validationErrors = (0, _react.useMemo)(function () {
    if (isValidating) {
      return [];
    }

    if (validateIndicesRequest.state === 'rejected') {
      return [{
        error: 'NETWORK_ERROR'
      }];
    }

    if (selectedIndexNames.length === 0) {
      return [{
        error: 'TOO_FEW_SELECTED_INDICES'
      }];
    }

    return validatedIndices.reduce(function (errors, index) {
      return index.validity === 'invalid' && selectedIndexNames.includes(index.name) ? [].concat(_toConsumableArray(errors), _toConsumableArray(index.errors)) : errors;
    }, []);
  }, [isValidating, validateIndicesRequest.state, selectedIndexNames, validatedIndices]);
  return {
    cleanUpAndSetUp: cleanUpAndSetUp,
    endTime: endTime,
    isValidating: isValidating,
    selectedIndexNames: selectedIndexNames,
    setEndTime: setEndTime,
    setStartTime: setStartTime,
    setUp: setUp,
    startTime: startTime,
    validatedIndices: validatedIndices,
    setValidatedIndices: setValidatedIndices,
    validationErrors: validationErrors
  };
};

exports.useAnalysisSetupState = useAnalysisSetupState;