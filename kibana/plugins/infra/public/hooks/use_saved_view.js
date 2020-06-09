"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSavedView = void 0;

var _react = require("react");

var _i18n = require("@kbn/i18n");

var _use_find_saved_object = require("./use_find_saved_object");

var _use_create_saved_object = require("./use_create_saved_object");

var _use_delete_saved_object = require("./use_delete_saved_object");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSavedView = function useSavedView(defaultViewState, viewType) {
  var _useFindSavedObject = (0, _use_find_saved_object.useFindSavedObject)(viewType),
      data = _useFindSavedObject.data,
      loading = _useFindSavedObject.loading,
      find = _useFindSavedObject.find,
      errorOnFind = _useFindSavedObject.error,
      hasView = _useFindSavedObject.hasView;

  var _useCreateSavedObject = (0, _use_create_saved_object.useCreateSavedObject)(viewType),
      create = _useCreateSavedObject.create,
      errorOnCreate = _useCreateSavedObject.error,
      createdId = _useCreateSavedObject.createdId;

  var _useDeleteSavedObject = (0, _use_delete_saved_object.useDeleteSavedObject)(viewType),
      deleteObject = _useDeleteSavedObject.deleteObject,
      deletedId = _useDeleteSavedObject.deletedId;

  var deleteView = (0, _react.useCallback)(function (id) {
    return deleteObject(id);
  }, [deleteObject]);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      createError = _useState2[0],
      setCreateError = _useState2[1];

  (0, _react.useEffect)(function () {
    return setCreateError(errorOnCreate);
  }, [errorOnCreate]);
  var saveView = (0, _react.useCallback)(function (d) {
    var doSave =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var exists;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return hasView(d.name);

              case 2:
                exists = _context.sent;

                if (!exists) {
                  _context.next = 6;
                  break;
                }

                setCreateError(_i18n.i18n.translate('xpack.infra.savedView.errorOnCreate.duplicateViewName', {
                  defaultMessage: "A view with that name already exists."
                }));
                return _context.abrupt("return");

              case 6:
                create(d);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function doSave() {
        return _ref.apply(this, arguments);
      };
    }();

    setCreateError(null);
    doSave();
  }, [create, hasView]);
  var savedObjects = (0, _react.useMemo)(function () {
    return data ? data.savedObjects : [];
  }, [data]);
  var views = (0, _react.useMemo)(function () {
    var items = [_objectSpread({
      name: _i18n.i18n.translate('xpack.infra.savedView.defaultViewName', {
        defaultMessage: 'Default'
      }),
      id: '0',
      isDefault: true
    }, defaultViewState)];
    savedObjects.forEach(function (o) {
      return o.type === viewType && items.push(_objectSpread({}, o.attributes, {
        id: o.id
      }));
    });
    return items;
  }, [defaultViewState, savedObjects, viewType]);
  return {
    views: views,
    saveView: saveView,
    loading: loading,
    deletedId: deletedId,
    createdId: createdId,
    errorOnFind: errorOnFind,
    errorOnCreate: createError,
    deleteView: deleteView,
    find: find
  };
};

exports.useSavedView = useSavedView;