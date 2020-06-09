"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceValidator = void 0;

var _i18n = require("@kbn/i18n");

var _is_reserved_space = require("../../../common/is_reserved_space");

var _space_identifier_utils = require("./space_identifier_utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SpaceValidator =
/*#__PURE__*/
function () {
  function SpaceValidator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SpaceValidator);

    _defineProperty(this, "shouldValidate", void 0);

    this.shouldValidate = options.shouldValidate || false;
  }

  _createClass(SpaceValidator, [{
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
    key: "validateSpaceName",
    value: function validateSpaceName(space) {
      if (!this.shouldValidate) {
        return valid();
      }

      if (!space.name || !space.name.trim()) {
        return invalid(_i18n.i18n.translate('xpack.spaces.management.validateSpace.requiredNameErrorMessage', {
          defaultMessage: 'Name is required.'
        }));
      }

      if (space.name.length > 1024) {
        return invalid(_i18n.i18n.translate('xpack.spaces.management.validateSpace.nameMaxLengthErrorMessage', {
          defaultMessage: 'Name must not exceed 1024 characters.'
        }));
      }

      return valid();
    }
  }, {
    key: "validateSpaceDescription",
    value: function validateSpaceDescription(space) {
      if (!this.shouldValidate) {
        return valid();
      }

      if (space.description && space.description.length > 2000) {
        return invalid(_i18n.i18n.translate('xpack.spaces.management.validateSpace.describeMaxLengthErrorMessage', {
          defaultMessage: 'Description must not exceed 2000 characters.'
        }));
      }

      return valid();
    }
  }, {
    key: "validateURLIdentifier",
    value: function validateURLIdentifier(space) {
      if (!this.shouldValidate) {
        return valid();
      }

      if ((0, _is_reserved_space.isReservedSpace)(space)) {
        return valid();
      }

      if (!space.id) {
        return invalid(_i18n.i18n.translate('xpack.spaces.management.validateSpace.urlIdentifierRequiredErrorMessage', {
          defaultMessage: 'URL identifier is required.'
        }));
      }

      if (!(0, _space_identifier_utils.isValidSpaceIdentifier)(space.id)) {
        return invalid(_i18n.i18n.translate('xpack.spaces.management.validateSpace.urlIdentifierAllowedCharactersErrorMessage', {
          defaultMessage: 'URL identifier can only contain a-z, 0-9, and the characters "_" and "-".'
        }));
      }

      return valid();
    }
  }, {
    key: "validateEnabledFeatures",
    value: function validateEnabledFeatures(space) {
      return valid();
    }
  }, {
    key: "validateForSave",
    value: function validateForSave(space) {
      var _this$validateSpaceNa = this.validateSpaceName(space),
          isNameInvalid = _this$validateSpaceNa.isInvalid;

      var _this$validateSpaceDe = this.validateSpaceDescription(space),
          isDescriptionInvalid = _this$validateSpaceDe.isInvalid;

      var _this$validateURLIden = this.validateURLIdentifier(space),
          isIdentifierInvalid = _this$validateURLIden.isInvalid;

      var _this$validateEnabled = this.validateEnabledFeatures(space),
          areFeaturesInvalid = _this$validateEnabled.isInvalid;

      if (isNameInvalid || isDescriptionInvalid || isIdentifierInvalid || areFeaturesInvalid) {
        return invalid();
      }

      return valid();
    }
  }]);

  return SpaceValidator;
}();

exports.SpaceValidator = SpaceValidator;

function invalid() {
  var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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