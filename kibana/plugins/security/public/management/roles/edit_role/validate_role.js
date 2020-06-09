"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleValidator = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RoleValidator =
/*#__PURE__*/
function () {
  function RoleValidator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RoleValidator);

    _defineProperty(this, "shouldValidate", void 0);

    this.shouldValidate = options.shouldValidate;
  }

  _createClass(RoleValidator, [{
    key: "enableValidation",
    value: function enableValidation() {
      this.shouldValidate = true;
    }
  }, {
    key: "disableValidation",
    value: function disableValidation() {
      this.shouldValidate = false;
    }
  }, {
    key: "validateRoleName",
    value: function validateRoleName(role) {
      if (!this.shouldValidate) {
        return valid();
      }

      if (!role.name) {
        return invalid(_i18n.i18n.translate('xpack.security.management.editRole.validateRole.provideRoleNameWarningMessage', {
          defaultMessage: 'Please provide a role name'
        }));
      }

      if (role.name.length > 1024) {
        return invalid(_i18n.i18n.translate('xpack.security.management.editRole.validateRole.nameLengthWarningMessage', {
          defaultMessage: 'Name must not exceed 1024 characters'
        }));
      }

      if (!role.name.match(/^[a-zA-Z_][a-zA-Z0-9_@\-\$\.]*$/)) {
        return invalid(_i18n.i18n.translate('xpack.security.management.editRole.validateRole.nameAllowedCharactersWarningMessage', {
          defaultMessage: 'Name must begin with a letter or underscore and contain only letters, underscores, and numbers.'
        }));
      }

      return valid();
    }
  }, {
    key: "validateIndexPrivileges",
    value: function validateIndexPrivileges(role) {
      var _this = this;

      if (!this.shouldValidate) {
        return valid();
      }

      if (!Array.isArray(role.elasticsearch.indices)) {
        throw new TypeError(_i18n.i18n.translate('xpack.security.management.editRole.validateRole.indicesTypeErrorMessage', {
          defaultMessage: 'Expected {elasticIndices} to be an array',
          values: {
            elasticIndices: '"role.elasticsearch.indices"'
          }
        }));
      }

      var areIndicesValid = role.elasticsearch.indices.map(function (indexPriv) {
        return _this.validateIndexPrivilege(indexPriv);
      }).find(function (result) {
        return result.isInvalid;
      }) == null;

      if (areIndicesValid) {
        return valid();
      }

      return invalid();
    }
  }, {
    key: "validateIndexPrivilege",
    value: function validateIndexPrivilege(indexPrivilege) {
      if (!this.shouldValidate) {
        return valid();
      }

      if (indexPrivilege.names.length && !indexPrivilege.privileges.length) {
        return invalid(_i18n.i18n.translate('xpack.security.management.editRole.validateRole.onePrivilegeRequiredWarningMessage', {
          defaultMessage: 'At least one privilege is required'
        }));
      }

      return valid();
    }
  }, {
    key: "validateSelectedSpaces",
    value: function validateSelectedSpaces(spaceIds, privilege) {
      if (!this.shouldValidate) {
        return valid();
      } // If no assigned privilege, then no spaces are OK


      if (!privilege) {
        return valid();
      }

      if (Array.isArray(spaceIds) && spaceIds.length > 0) {
        return valid();
      }

      return invalid(_i18n.i18n.translate('xpack.security.management.editRole.validateRole.oneSpaceRequiredWarningMessage', {
        defaultMessage: 'At least one space is required'
      }));
    }
  }, {
    key: "validateSelectedPrivilege",
    value: function validateSelectedPrivilege(spaceIds, privilege) {
      if (!this.shouldValidate) {
        return valid();
      } // If no assigned spaces, then a missing privilege is OK


      if (!spaceIds || spaceIds.length === 0) {
        return valid();
      }

      if (privilege) {
        return valid();
      }

      return invalid(_i18n.i18n.translate('xpack.security.management.editRole.validateRole.privilegeRequiredWarningMessage', {
        defaultMessage: 'Privilege is required'
      }));
    }
  }, {
    key: "validateSpacePrivileges",
    value: function validateSpacePrivileges(role) {
      if (!this.shouldValidate) {
        return valid();
      }

      var privileges = role.kibana || [];
      var arePrivilegesValid = privileges.every(function (assignedPrivilege) {
        return assignedPrivilege.base.length > 0 || Object.keys(assignedPrivilege.feature).length > 0;
      });

      if (arePrivilegesValid) {
        return valid();
      }

      return invalid();
    }
  }, {
    key: "validateForSave",
    value: function validateForSave(role) {
      var _this$validateRoleNam = this.validateRoleName(role),
          isNameInvalid = _this$validateRoleNam.isInvalid;

      var _this$validateIndexPr = this.validateIndexPrivileges(role),
          areIndicesInvalid = _this$validateIndexPr.isInvalid;

      var _this$validateSpacePr = this.validateSpacePrivileges(role),
          areSpacePrivilegesInvalid = _this$validateSpacePr.isInvalid;

      if (isNameInvalid || areIndicesInvalid || areSpacePrivilegesInvalid) {
        return invalid();
      }

      return valid();
    }
  }]);

  return RoleValidator;
}();

exports.RoleValidator = RoleValidator;

function invalid(error) {
  return {
    isInvalid: true,
    error: error
  };
}

function valid() {
  return {
    isInvalid: false
  };
}