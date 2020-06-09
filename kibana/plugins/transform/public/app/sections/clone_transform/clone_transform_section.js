"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloneTransformSection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _use_api = require("../../hooks/use_api");

var _use_documentation_links = require("../../hooks/use_documentation_links");

var _use_search_items = require("../../hooks/use_search_items");

var _constants = require("../../../../common/constants");

var _app_dependencies = require("../../app_dependencies");

var _navigation = require("../../services/navigation");

var _authorization = require("../../lib/authorization");

var _wizard = require("../create_transform/components/wizard");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isGetTransformsResponseError(arg) {
  return arg.error !== undefined;
}

var CloneTransformSection = function CloneTransformSection(_ref) {
  var match = _ref.match;
  // Set breadcrumb and page title
  (0, _react.useEffect)(function () {
    _navigation.breadcrumbService.setBreadcrumbs(_navigation.BREADCRUMB_SECTION.CLONE_TRANSFORM);

    _navigation.docTitleService.setTitle('createTransform');
  }, []);
  var api = (0, _use_api.useApi)();
  var appDeps = (0, _app_dependencies.useAppDependencies)();
  var savedObjectsClient = appDeps.savedObjects.client;
  var indexPatterns = appDeps.data.indexPatterns;

  var _useDocumentationLink = (0, _use_documentation_links.useDocumentationLinks)(),
      esTransform = _useDocumentationLink.esTransform;

  var transformId = match.params.transformId;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      transformConfig = _useState2[0],
      setTransformConfig = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      errorMessage = _useState4[0],
      setErrorMessage = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isInitialized = _useState6[0],
      setIsInitialized = _useState6[1];

  var _useSearchItems = (0, _use_search_items.useSearchItems)(undefined),
      getIndexPatternIdByTitle = _useSearchItems.getIndexPatternIdByTitle,
      loadIndexPatterns = _useSearchItems.loadIndexPatterns,
      searchItems = _useSearchItems.searchItems,
      setSavedObjectId = _useSearchItems.setSavedObjectId;

  var fetchTransformConfig =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var transformConfigs, indexPatternTitle, indexPatternId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return api.getTransforms(transformId);

            case 3:
              transformConfigs = _context.sent;

              if (!isGetTransformsResponseError(transformConfigs)) {
                _context.next = 9;
                break;
              }

              setTransformConfig(undefined);
              setErrorMessage(transformConfigs.error.msg);
              setIsInitialized(true);
              return _context.abrupt("return");

            case 9:
              _context.next = 11;
              return loadIndexPatterns(savedObjectsClient, indexPatterns);

            case 11:
              indexPatternTitle = Array.isArray(transformConfigs.transforms[0].source.index) ? transformConfigs.transforms[0].source.index.join(',') : transformConfigs.transforms[0].source.index;
              indexPatternId = getIndexPatternIdByTitle(indexPatternTitle);

              if (!(indexPatternId === undefined)) {
                _context.next = 15;
                break;
              }

              throw new Error(_i18n.i18n.translate('xpack.transform.clone.errorPromptText', {
                defaultMessage: 'Could not fetch the Kibana index pattern ID.'
              }));

            case 15:
              setSavedObjectId(indexPatternId);
              setTransformConfig(transformConfigs.transforms[0]);
              setErrorMessage(undefined);
              setIsInitialized(true);
              _context.next = 26;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              setTransformConfig(undefined);

              if (_context.t0.message !== undefined) {
                setErrorMessage(_context.t0.message);
              } else {
                setErrorMessage(JSON.stringify(_context.t0, null, 2));
              }

              setIsInitialized(true);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
    }));

    return function fetchTransformConfig() {
      return _ref2.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    fetchTransformConfig(); // The effect should only be called once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return _react.default.createElement(_authorization.PrivilegesWrapper, {
    privileges: _constants.APP_CREATE_TRANSFORM_CLUSTER_PRIVILEGES
  }, _react.default.createElement(_eui.EuiPageContent, {
    "data-test-subj": "transformPageCloneTransform"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformsWizard.cloneTransformTitle",
    defaultMessage: "Clone transform"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    href: esTransform,
    target: "_blank",
    iconType: "help",
    "data-test-subj": "documentationLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformsWizard.transformDocsLinkText",
    defaultMessage: "Transform docs"
  }))))), _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), typeof errorMessage !== 'undefined' && _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.transform.clone.errorPromptTitle', {
      defaultMessage: 'An error occurred getting the transform configuration.'
    }),
    color: "danger",
    iconType: "alert"
  }, _react.default.createElement("pre", null, JSON.stringify(errorMessage))), searchItems !== undefined && isInitialized === true && transformConfig !== undefined && _react.default.createElement(_wizard.Wizard, {
    cloneConfig: transformConfig,
    searchItems: searchItems
  }))));
};

exports.CloneTransformSection = CloneTransformSection;