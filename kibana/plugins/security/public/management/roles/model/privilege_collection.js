"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeCollection = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PrivilegeCollection =
/*#__PURE__*/
function () {
  function PrivilegeCollection(privileges) {
    _classCallCheck(this, PrivilegeCollection);

    _defineProperty(this, "actions", void 0);

    this.actions = new Set(privileges.reduce(function (acc, priv) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(priv.actions));
    }, []));
  }

  _createClass(PrivilegeCollection, [{
    key: "grantsPrivilege",
    value: function grantsPrivilege(privilege) {
      return this.checkActions(this.actions, privilege.actions).hasAllRequested;
    }
  }, {
    key: "checkActions",
    value: function checkActions(knownActions, candidateActions) {
      var missing = candidateActions.filter(function (action) {
        return !knownActions.has(action);
      });
      var hasAllRequested = knownActions.size > 0 && candidateActions.length > 0 && missing.length === 0;
      return {
        missing: missing,
        hasAllRequested: hasAllRequested
      };
    }
  }]);

  return PrivilegeCollection;
}();

exports.PrivilegeCollection = PrivilegeCollection;