"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformManagementSection = exports.TransformManagement = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../common/constants");

var _common = require("../../common");

var _use_documentation_links = require("../../hooks/use_documentation_links");

var _hooks = require("../../hooks");

var _navigation = require("../../common/navigation");

var _authorization = require("../../lib/authorization");

var _navigation2 = require("../../services/navigation");

var _use_refresh_interval = require("./components/transform_list/use_refresh_interval");

var _search_selection = require("./components/search_selection");

var _transform_list = require("./components/transform_list");

var _transforms_stats_bar = require("./components/transform_list/transforms_stats_bar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TransformManagement = function TransformManagement() {
  var _useDocumentationLink = (0, _use_documentation_links.useDocumentationLinks)(),
      esTransform = _useDocumentationLink.esTransform;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      transformsLoading = _useState2[0],
      setTransformsLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isInitialized = _useState4[0],
      setIsInitialized = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      blockRefresh = _useState6[0],
      setBlockRefresh = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      transforms = _useState8[0],
      setTransforms = _useState8[1];

  var _useState9 = (0, _react.useState)(undefined),
      _useState10 = _slicedToArray(_useState9, 2),
      errorMessage = _useState10[0],
      setErrorMessage = _useState10[1];

  var getTransforms = (0, _hooks.useGetTransforms)(setTransforms, setErrorMessage, setIsInitialized, blockRefresh); // Subscribe to the refresh observable to trigger reloading the transform list.

  (0, _common.useRefreshTransformList)({
    isLoading: setTransformsLoading,
    onRefresh: function onRefresh() {
      return getTransforms(true);
    }
  }); // Call useRefreshInterval() after the subscription above is set up.

  (0, _use_refresh_interval.useRefreshInterval)(setBlockRefresh);

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isSearchSelectionVisible = _useState12[0],
      setIsSearchSelectionVisible = _useState12[1];

  var _useState13 = (0, _react.useState)(null),
      _useState14 = _slicedToArray(_useState13, 2),
      savedObjectId = _useState14[0],
      setSavedObjectId = _useState14[1];

  if (savedObjectId !== null) {
    return _react.default.createElement(_navigation.RedirectToCreateTransform, {
      savedObjectId: savedObjectId
    });
  }

  var onCloseModal = function onCloseModal() {
    return setIsSearchSelectionVisible(false);
  };

  var onOpenModal = function onOpenModal() {
    return setIsSearchSelectionVisible(true);
  };

  var onSearchSelected = function onSearchSelected(id, type) {
    setSavedObjectId(id);
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiPageContent, {
    "data-test-subj": "transformPageTransformList"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement("h1", {
    "data-test-subj": "transformAppTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformList.transformTitle",
    defaultMessage: "Transforms"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    href: esTransform,
    target: "_blank",
    iconType: "help",
    "data-test-subj": "documentationLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformList.transformDocsLinkText",
    defaultMessage: "Transform docs"
  }))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformList.transformDescription",
    defaultMessage: "Use transforms to pivot existing Elasticsearch indices into summarized or entity-centric indices."
  }))), _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_transforms_stats_bar.TransformStatsBar, {
    transformsList: transforms
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_transform_list.TransformList, {
    errorMessage: errorMessage,
    isInitialized: isInitialized,
    onCreateTransform: onOpenModal,
    transforms: transforms,
    transformsLoading: transformsLoading
  }))), isSearchSelectionVisible && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: onCloseModal,
    className: "transformCreateTransformSearchDialog",
    "data-test-subj": "transformSelectSourceModal"
  }, _react.default.createElement(_search_selection.SearchSelection, {
    onSearchSelected: onSearchSelected
  }))));
};

exports.TransformManagement = TransformManagement;

var TransformManagementSection = function TransformManagementSection() {
  // Set breadcrumb and page title
  (0, _react.useEffect)(function () {
    _navigation2.breadcrumbService.setBreadcrumbs(_navigation2.BREADCRUMB_SECTION.HOME);

    _navigation2.docTitleService.setTitle('home');
  }, []);
  return _react.default.createElement(_authorization.PrivilegesWrapper, {
    privileges: _constants.APP_GET_TRANSFORM_CLUSTER_PRIVILEGES
  }, _react.default.createElement(TransformManagement, null));
};

exports.TransformManagementSection = TransformManagementSection;