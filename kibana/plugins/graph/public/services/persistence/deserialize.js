"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookupIndexPattern = lookupIndexPattern;
exports.mapFields = mapFields;
exports.makeNodeId = makeNodeId;
exports.savedWorkspaceToAppState = savedWorkspaceToAppState;

var _outlink_encoders = require("../../helpers/outlink_encoders");

var _style_choices = require("../../helpers/style_choices");

var _public = require("../../../../../../src/plugins/data/public");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultAdvancedSettings = {
  useSignificance: true,
  sampleSize: 2000,
  timeoutMillis: 5000,
  maxValuesPerDoc: 1,
  minDocCount: 3
};

function deserializeUrlTemplate(_ref) {
  var encoderID = _ref.encoderID,
      iconClass = _ref.iconClass,
      serializableProps = _objectWithoutProperties(_ref, ["encoderID", "iconClass"]);

  var encoder = _outlink_encoders.outlinkEncoders.find(function (outlinkEncoder) {
    return outlinkEncoder.id === encoderID;
  });

  if (!encoder) {
    return;
  }

  var template = _objectSpread({}, serializableProps, {
    encoder: encoder,
    icon: null
  });

  if (iconClass) {
    var iconCandidate = _style_choices.urlTemplateIconChoicesByClass[iconClass];
    template.icon = iconCandidate ? iconCandidate : null;
  }

  return template;
} // returns the id of the index pattern, lookup is done in app.js


function lookupIndexPattern(savedWorkspace, indexPatterns) {
  var serializedWorkspaceState = JSON.parse(savedWorkspace.wsState);
  var indexPattern = indexPatterns.find(function (pattern) {
    return pattern.attributes.title === serializedWorkspaceState.indexPattern;
  });

  if (indexPattern) {
    return indexPattern;
  }
} // returns all graph fields mapped out of the index pattern


function mapFields(indexPattern) {
  var blockedFieldNames = ['_id', '_index', '_score', '_source', '_type'];
  var defaultHopSize = 5;
  return indexPattern.getNonScriptedFields().filter(function (field) {
    return !blockedFieldNames.includes(field.name) && !_public.indexPatterns.isNestedField(field);
  }).map(function (field, index) {
    return {
      name: field.name,
      hopSize: defaultHopSize,
      lastValidHopSize: defaultHopSize,
      icon: (0, _style_choices.getSuitableIcon)(field.name),
      color: _style_choices.colorChoices[index % _style_choices.colorChoices.length],
      selected: false,
      type: field.type,
      aggregatable: Boolean(field.aggregatable)
    };
  }).sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }

    return 0;
  });
}

function getFieldsWithWorkspaceSettings(indexPattern, selectedFields) {
  var allFields = mapFields(indexPattern); // merge in selected information into all fields

  selectedFields.forEach(function (serializedField) {
    var workspaceField = allFields.find(function (field) {
      return field.name === serializedField.name;
    });

    if (!workspaceField) {
      return;
    }

    workspaceField.hopSize = serializedField.hopSize;
    workspaceField.lastValidHopSize = serializedField.lastValidHopSize;
    workspaceField.color = serializedField.color;
    workspaceField.icon = _style_choices.iconChoicesByClass[serializedField.iconClass];
    workspaceField.selected = true;
  });
  return allFields;
}

function getBlacklistedNodes(serializedWorkspaceState, allFields) {
  return serializedWorkspaceState.blacklist.map(function (serializedNode) {
    var currentField = allFields.find(function (field) {
      return field.name === serializedNode.field;
    });
    return {
      x: 0,
      y: 0,
      label: serializedNode.label,
      color: serializedNode.color,
      icon: currentField.icon,
      parent: null,
      scaledSize: 0,
      data: {
        field: serializedNode.field,
        term: serializedNode.term
      }
    };
  });
}

function resolveGroups(nodes, workspaceInstance) {
  nodes.forEach(function (_ref2) {
    var field = _ref2.field,
        term = _ref2.term,
        x = _ref2.x,
        y = _ref2.y,
        parent = _ref2.parent;
    var nodeId = makeNodeId(field, term);
    var workspaceNode = workspaceInstance.nodesMap[nodeId];
    workspaceNode.x = x;
    workspaceNode.y = y;

    if (parent !== null) {
      var _nodes$parent = nodes[parent],
          parentField = _nodes$parent.field,
          parentTerm = _nodes$parent.term;
      var parentId = makeNodeId(parentField, parentTerm);
      workspaceNode.parent = workspaceInstance.nodesMap[parentId];
    }
  });
}

function getNodesAndEdges(persistedWorkspaceState, allFields) {
  return {
    nodes: persistedWorkspaceState.vertices.map(function (serializedNode) {
      return _objectSpread({}, serializedNode, {
        id: '',
        icon: allFields.find(function (field) {
          return field.name === serializedNode.field;
        }).icon,
        data: {
          field: serializedNode.field,
          term: serializedNode.term
        }
      });
    }),
    edges: persistedWorkspaceState.links.map(function (serializedEdge) {
      return _objectSpread({}, serializedEdge, {
        id: ''
      });
    })
  };
}

function makeNodeId(field, term) {
  return field + '..' + term;
}

function savedWorkspaceToAppState(savedWorkspace, indexPattern, workspaceInstance) {
  var _workspaceInstance$bl;

  var persistedWorkspaceState = JSON.parse(savedWorkspace.wsState); // ================== url templates =============================

  var urlTemplates = persistedWorkspaceState.urlTemplates.map(deserializeUrlTemplate).filter(function (template) {
    return Boolean(template);
  }); // ================== fields =============================

  var allFields = getFieldsWithWorkspaceSettings(indexPattern, persistedWorkspaceState.selectedFields);
  var selectedFields = allFields.filter(function (field) {
    return field.selected;
  });
  workspaceInstance.options.vertex_fields = selectedFields; // ================== advanced settings =============================

  var advancedSettings = Object.assign({}, defaultAdvancedSettings, persistedWorkspaceState.exploreControls);

  if (advancedSettings.sampleDiversityField) {
    // restore reference to sample diversity field
    var serializedField = advancedSettings.sampleDiversityField;
    advancedSettings.sampleDiversityField = allFields.find(function (field) {
      return field.name === serializedField.name;
    });
  }

  workspaceInstance.options.exploreControls = advancedSettings; // ================== nodes and edges =============================

  var graph = getNodesAndEdges(persistedWorkspaceState, allFields);
  workspaceInstance.mergeGraph(graph);
  resolveGroups(persistedWorkspaceState.vertices, workspaceInstance); // ================== blacklist =============================

  var blacklistedNodes = getBlacklistedNodes(persistedWorkspaceState, allFields);

  (_workspaceInstance$bl = workspaceInstance.blacklistedNodes).push.apply(_workspaceInstance$bl, _toConsumableArray(blacklistedNodes));

  return {
    urlTemplates: urlTemplates,
    advancedSettings: advancedSettings,
    allFields: allFields
  };
}