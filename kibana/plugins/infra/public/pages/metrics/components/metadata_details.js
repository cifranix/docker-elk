"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetadataDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _public = require("../../../../../observability/public");

var _metadata_context = require("../containers/metadata_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\nflex-grow: 0;\nmargin-right: ", ";\nmin-width: 0px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nborder-top: ", " solid ", ";\nborder-bottom: ", " solid ", ";\npadding: ", " 0;\nmargin-bottom: ", ";\ndisplay: flex;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FIELDS = [{
  field: 'cloud.instance.id',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.instanceId', {
    defaultMessage: 'Instance ID'
  })
}, {
  field: 'cloud.provider',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.cloudProvider', {
    defaultMessage: 'Cloud Provider'
  })
}, {
  field: 'host.os.name',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.operatinSystem', {
    defaultMessage: 'Operating System'
  })
}, {
  field: 'host.os.kernel',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.kernelVersion', {
    defaultMessage: 'Kernel Version'
  })
}, {
  field: 'host.hostname',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.hostname', {
    defaultMessage: 'Hostname'
  })
}, {
  field: 'host.containerized',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.containerized', {
    defaultMessage: 'Containerized'
  }),
  isBoolean: true
}, {
  field: 'cloud.project.id',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.projectId', {
    defaultMessage: 'Project ID'
  })
}, {
  field: 'cloud.availability_zone',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.availabilityZone', {
    defaultMessage: 'Availability Zone'
  })
}, {
  field: 'cloud.machine.type',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.machineType', {
    defaultMessage: 'Machine Type'
  })
}, {
  field: 'cloud.instance.name',
  label: _i18n.i18n.translate('xpack.infra.nodeDetails.labels.instanceName', {
    defaultMessage: 'Instance Name'
  })
}];

var getLabelForField = function getLabelForField(_ref) {
  var field = _ref.field;
  var fieldDef = FIELDS.find(function (f) {
    return f.field === field;
  });
  if (!fieldDef) return field;
  return fieldDef.label;
};

var getValueForField = function getValueForField(metadata, _ref2) {
  var field = _ref2.field,
      isBoolean = _ref2.isBoolean;

  if (isBoolean) {
    return (0, _lodash.get)(metadata.info, field, false) ? _i18n.i18n.translate('xpack.infra.nodeDetails.yes', {
      defaultMessage: 'Yes'
    }) : _i18n.i18n.translate('xpack.infra.nodeDetails.no', {
      defaultMessage: 'No'
    });
  }

  var value = (0, _lodash.get)(metadata.info, field, '--');
  return value;
};

var NUMBER_OF_COLUMNS = 4;

var MetadataDetails = function MetadataDetails(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setControlState = _useState2[1];

  var toggleIsOpen = (0, _react.useCallback)(function () {
    return isOpen ? setControlState(false) : setControlState(true);
  }, [isOpen]);
  var filteredFields = (0, _react.useMemo)(function () {
    if (props.fields && props.fields.length) {
      return props.fields.map(function (field) {
        var fieldDef = FIELDS.find(function (f) {
          return f.field === field;
        });

        if (fieldDef) {
          return fieldDef;
        }
      }).filter(function (f) {
        return f;
      });
    } else {
      return FIELDS;
    }
  }, [props.fields]);
  var fields = (0, _react.useMemo)(function () {
    return isOpen ? filteredFields : filteredFields.slice(0, NUMBER_OF_COLUMNS);
  }, [filteredFields, isOpen]);
  var metadata = (0, _react.useContext)(_metadata_context.MetadataContext);

  if (!metadata) {
    return null;
  }

  return _react.default.createElement(MetadataContainer, null, filteredFields.length > NUMBER_OF_COLUMNS ? _react.default.createElement(Controls, null, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: isOpen ? 'arrowUp' : 'arrowDown',
    onClick: toggleIsOpen,
    "aria-label": _i18n.i18n.translate('xpack.infra.nodeDetails.labels.showMoreDetails', {
      defaultMessage: 'Show more details'
    })
  })) : null, _react.default.createElement(_eui.EuiFlexGrid, {
    columns: NUMBER_OF_COLUMNS,
    style: {
      flexGrow: 1
    },
    gutterSize: "s"
  }, fields.map(function (field) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: field.field,
      style: {
        minWidth: 0
      }
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("h5", null, getLabelForField(field))), _react.default.createElement(_eui.EuiText, null, getValueForField(metadata, field)));
  })));
};

exports.MetadataDetails = MetadataDetails;

var MetadataContainer = _public.euiStyled.div(_templateObject(), function (props) {
  return props.theme.eui.euiBorderWidthThin;
}, function (props) {
  return props.theme.eui.euiBorderColor;
}, function (props) {
  return props.theme.eui.euiBorderWidthThin;
}, function (props) {
  return props.theme.eui.euiBorderColor;
}, function (props) {
  return props.theme.eui.paddingSizes.m;
}, function (props) {
  return props.theme.eui.paddingSizes.m;
});

var Controls = _public.euiStyled.div(_templateObject2(), function (props) {
  return props.theme.eui.paddingSizes.m;
});