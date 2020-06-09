"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentCanceledPromiseError = exports.CanceledPromiseError = exports.useTrackedPromise = void 0;

var _react = require("react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * This hook manages a Promise factory and can create new Promises from it. The
 * state of these Promises is tracked and they can be canceled when superseded
 * to avoid race conditions.
 *
 * ```
 * const [requestState, performRequest] = useTrackedPromise(
 *   {
 *     cancelPreviousOn: 'resolution',
 *     createPromise: async (url: string) => {
 *       return await fetchSomething(url)
 *     },
 *     onResolve: response => {
 *       setSomeState(response.data);
 *     },
 *     onReject: response => {
 *       setSomeError(response);
 *     },
 *   },
 *   [fetchSomething]
 * );
 * ```
 *
 * The `onResolve` and `onReject` handlers are registered separately, because
 * the hook will inject a rejection when in case of a canellation. The
 * `cancelPreviousOn` attribute can be used to indicate when the preceding
 * pending promises should be canceled:
 *
 * 'never': No preceding promises will be canceled.
 *
 * 'creation': Any preceding promises will be canceled as soon as a new one is
 * created.
 *
 * 'settlement': Any preceding promise will be canceled when a newer promise is
 * resolved or rejected.
 *
 * 'resolution': Any preceding promise will be canceled when a newer promise is
 * resolved.
 *
 * 'rejection': Any preceding promise will be canceled when a newer promise is
 * rejected.
 *
 * Any pending promises will be canceled when the component using the hook is
 * unmounted, but their status will not be tracked to avoid React warnings
 * about memory leaks.
 *
 * The last argument is a normal React hook dependency list that indicates
 * under which conditions a new reference to the configuration object should be
 * used.
 */
var useTrackedPromise = function useTrackedPromise(_ref, dependencies) {
  var createPromise = _ref.createPromise,
      _ref$onResolve = _ref.onResolve,
      onResolve = _ref$onResolve === void 0 ? noOp : _ref$onResolve,
      _ref$onReject = _ref.onReject,
      onReject = _ref$onReject === void 0 ? noOp : _ref$onReject,
      _ref$cancelPreviousOn = _ref.cancelPreviousOn,
      cancelPreviousOn = _ref$cancelPreviousOn === void 0 ? 'never' : _ref$cancelPreviousOn;

  /**
   * If a promise is currently pending, this holds a reference to it and its
   * cancellation function.
   */
  var pendingPromises = (0, _react.useRef)([]);
  /**
   * The state of the promise most recently created by the `createPromise`
   * factory. It could be uninitialized, pending, resolved or rejected.
   */

  var _useState = (0, _react.useState)({
    state: 'uninitialized'
  }),
      _useState2 = _slicedToArray(_useState, 2),
      promiseState = _useState2[0],
      setPromiseState = _useState2[1];

  var execute = (0, _react.useMemo)(function () {
    return function () {
      var rejectCancellationPromise;
      var cancellationPromise = new Promise(function (_, reject) {
        rejectCancellationPromise = reject;
      }); // remember the list of prior pending promises for cancellation

      var previousPendingPromises = pendingPromises.current;

      var cancelPreviousPendingPromises = function cancelPreviousPendingPromises() {
        previousPendingPromises.forEach(function (promise) {
          return promise.cancel();
        });
      };

      var newPromise = createPromise.apply(void 0, arguments);
      var newCancelablePromise = Promise.race([newPromise, cancellationPromise]); // track this new state

      setPromiseState({
        state: 'pending',
        promise: newCancelablePromise
      });

      if (cancelPreviousOn === 'creation') {
        cancelPreviousPendingPromises();
      }

      var newPendingPromise = {
        cancel: function cancel() {
          rejectCancellationPromise(new CanceledPromiseError());
        },
        cancelSilently: function cancelSilently() {
          rejectCancellationPromise(new SilentCanceledPromiseError());
        },
        promise: newCancelablePromise.then(function (value) {
          setPromiseState(function (previousPromiseState) {
            return previousPromiseState.state === 'pending' && previousPromiseState.promise === newCancelablePromise ? {
              state: 'resolved',
              promise: newPendingPromise.promise,
              value: value
            } : previousPromiseState;
          });

          if (['settlement', 'resolution'].includes(cancelPreviousOn)) {
            cancelPreviousPendingPromises();
          } // remove itself from the list of pending promises


          pendingPromises.current = pendingPromises.current.filter(function (pendingPromise) {
            return pendingPromise.promise !== newPendingPromise.promise;
          });

          if (onResolve) {
            onResolve(value);
          }

          return value;
        }, function (value) {
          if (!(value instanceof SilentCanceledPromiseError)) {
            setPromiseState(function (previousPromiseState) {
              return previousPromiseState.state === 'pending' && previousPromiseState.promise === newCancelablePromise ? {
                state: 'rejected',
                promise: newCancelablePromise,
                value: value
              } : previousPromiseState;
            });
          }

          if (['settlement', 'rejection'].includes(cancelPreviousOn)) {
            cancelPreviousPendingPromises();
          } // remove itself from the list of pending promises


          pendingPromises.current = pendingPromises.current.filter(function (pendingPromise) {
            return pendingPromise.promise !== newPendingPromise.promise;
          });

          if (onReject) {
            onReject(value);
          }

          throw value;
        })
      }; // add the new promise to the list of pending promises

      pendingPromises.current = [].concat(_toConsumableArray(pendingPromises.current), [newPendingPromise]); // silence "unhandled rejection" warnings

      newPendingPromise.promise.catch(noOp);
      return newPendingPromise.promise;
    };
  }, // the dependencies are managed by the caller
  // eslint-disable-next-line react-hooks/exhaustive-deps
  dependencies);
  /**
   * Cancel any pending promises silently to avoid memory leaks and race
   * conditions.
   */

  (0, _react.useEffect)(function () {
    return function () {
      pendingPromises.current.forEach(function (promise) {
        return promise.cancelSilently();
      });
    };
  }, []);
  return [promiseState, execute];
};

exports.useTrackedPromise = useTrackedPromise;

var CanceledPromiseError =
/*#__PURE__*/
function (_Error) {
  _inherits(CanceledPromiseError, _Error);

  function CanceledPromiseError(message) {
    var _this;

    _classCallCheck(this, CanceledPromiseError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CanceledPromiseError).call(this, message));

    _defineProperty(_assertThisInitialized(_this), "isCanceled", true);

    Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof CanceledPromiseError ? this.constructor : void 0).prototype);
    return _this;
  }

  return CanceledPromiseError;
}(_wrapNativeSuper(Error));

exports.CanceledPromiseError = CanceledPromiseError;

var SilentCanceledPromiseError =
/*#__PURE__*/
function (_CanceledPromiseError) {
  _inherits(SilentCanceledPromiseError, _CanceledPromiseError);

  function SilentCanceledPromiseError() {
    _classCallCheck(this, SilentCanceledPromiseError);

    return _possibleConstructorReturn(this, _getPrototypeOf(SilentCanceledPromiseError).apply(this, arguments));
  }

  return SilentCanceledPromiseError;
}(CanceledPromiseError);

exports.SilentCanceledPromiseError = SilentCanceledPromiseError;

var noOp = function noOp() {
  return undefined;
};