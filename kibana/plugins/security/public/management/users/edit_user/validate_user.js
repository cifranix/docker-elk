"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserValidator = void 0;

var _i18n = require("@kbn/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var validUsernameRegex = /[a-zA-Z_][a-zA-Z0-9_@\-\$\.]*/;

var UserValidator =
/*#__PURE__*/
function () {
  function UserValidator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UserValidator);

    _defineProperty(this, "shouldValidate", void 0);

    this.shouldValidate = options.shouldValidate;
  }

  _createClass(UserValidator, [{
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
    key: "validateUsername",
    value: function validateUsername(user) {
      if (!this.shouldValidate) {
        return valid();
      }

      var username = user.username;

      if (!username) {
        return invalid(_i18n.i18n.translate('xpack.security.management.users.editUser.requiredUsernameErrorMessage', {
          defaultMessage: 'Username is required'
        }));
      } else if (username && !username.match(validUsernameRegex)) {
        return invalid(_i18n.i18n.translate('xpack.security.management.users.editUser.usernameAllowedCharactersErrorMessage', {
          defaultMessage: 'Username must begin with a letter or underscore and contain only letters, underscores, and numbers'
        }));
      }

      return valid();
    }
  }, {
    key: "validateEmail",
    value: function validateEmail(user) {
      if (!this.shouldValidate) {
        return valid();
      }

      var email = user.email;

      if (email && !email.match(validEmailRegex)) {
        return invalid(_i18n.i18n.translate('xpack.security.management.users.editUser.validEmailRequiredErrorMessage', {
          defaultMessage: 'Email address is invalid'
        }));
      }

      return valid();
    }
  }, {
    key: "validatePassword",
    value: function validatePassword(user) {
      if (!this.shouldValidate) {
        return valid();
      }

      var password = user.password;

      if (!password || password.length < 6) {
        return invalid(_i18n.i18n.translate('xpack.security.management.users.editUser.passwordLengthErrorMessage', {
          defaultMessage: 'Password must be at least 6 characters'
        }));
      }

      return valid();
    }
  }, {
    key: "validateConfirmPassword",
    value: function validateConfirmPassword(user) {
      if (!this.shouldValidate) {
        return valid();
      }

      var password = user.password,
          confirmPassword = user.confirmPassword;

      if (password && confirmPassword !== null && password !== confirmPassword) {
        return invalid(_i18n.i18n.translate('xpack.security.management.users.editUser.passwordDoNotMatchErrorMessage', {
          defaultMessage: 'Passwords do not match'
        }));
      }

      return valid();
    }
  }, {
    key: "validateForSave",
    value: function validateForSave(user, isNewUser) {
      var _this$validateUsernam = this.validateUsername(user),
          isUsernameInvalid = _this$validateUsernam.isInvalid;

      var _this$validateEmail = this.validateEmail(user),
          isEmailInvalid = _this$validateEmail.isInvalid;

      var isPasswordInvalid = false;
      var isConfirmPasswordInvalid = false;

      if (isNewUser) {
        isPasswordInvalid = this.validatePassword(user).isInvalid;
        isConfirmPasswordInvalid = this.validateConfirmPassword(user).isInvalid;
      }

      if (isUsernameInvalid || isEmailInvalid || isPasswordInvalid || isConfirmPasswordInvalid) {
        return invalid();
      }

      return valid();
    }
  }]);

  return UserValidator;
}();

exports.UserValidator = UserValidator;

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