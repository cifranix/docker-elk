"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeRegistry = void 0;

var _i18n = require("@kbn/i18n");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TypeRegistry =
/*#__PURE__*/
function () {
  function TypeRegistry() {
    _classCallCheck(this, TypeRegistry);

    _defineProperty(this, "objectTypes", new Map());
  }

  _createClass(TypeRegistry, [{
    key: "has",

    /**
     * Returns if the object type registry has the given type registered
     */
    value: function has(id) {
      return this.objectTypes.has(id);
    }
    /**
     * Registers an object type to the type registry
     */

  }, {
    key: "register",
    value: function register(objectType) {
      if (this.has(objectType.id)) {
        throw new Error(_i18n.i18n.translate('xpack.triggersActionsUI.typeRegistry.register.duplicateObjectTypeErrorMessage', {
          defaultMessage: 'Object type "{id}" is already registered.',
          values: {
            id: objectType.id
          }
        }));
      }

      this.objectTypes.set(objectType.id, objectType);
    }
    /**
     * Returns an object type, throw error if not registered
     */

  }, {
    key: "get",
    value: function get(id) {
      if (!this.has(id)) {
        throw new Error(_i18n.i18n.translate('xpack.triggersActionsUI.typeRegistry.get.missingActionTypeErrorMessage', {
          defaultMessage: 'Object type "{id}" is not registered.',
          values: {
            id: id
          }
        }));
      }

      return this.objectTypes.get(id);
    }
  }, {
    key: "list",
    value: function list() {
      return Array.from(this.objectTypes).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            objectType = _ref2[1];

        return objectType;
      });
    }
  }]);

  return TypeRegistry;
}();

exports.TypeRegistry = TypeRegistry;