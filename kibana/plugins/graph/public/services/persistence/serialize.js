"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appStateToSavedWorkspace = appStateToSavedWorkspace;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function serializeNode(_ref) {
  var data = _ref.data,
      scaledSize = _ref.scaledSize,
      parent = _ref.parent,
      x = _ref.x,
      y = _ref.y,
      label = _ref.label,
      color = _ref.color;
  var allNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    x: x,
    y: y,
    label: label,
    color: color,
    field: data.field,
    term: data.term,
    parent: parent ? allNodes.indexOf(parent) : null,
    size: scaledSize
  };
}

function serializeEdge(_ref2) {
  var source = _ref2.source,
      target = _ref2.target,
      weight = _ref2.weight,
      width = _ref2.width,
      label = _ref2.label;
  var allNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    weight: weight,
    width: width,
    label: label,
    source: allNodes.indexOf(source),
    target: allNodes.indexOf(target)
  };
}

function serializeUrlTemplate(_ref3) {
  var encoder = _ref3.encoder,
      icon = _ref3.icon,
      url = _ref3.url,
      description = _ref3.description,
      isDefault = _ref3.isDefault;
  var serializedTemplate = {
    url: url,
    description: description,
    isDefault: isDefault,
    encoderID: encoder.id
  };

  if (icon) {
    serializedTemplate.iconClass = icon.class;
  }

  return serializedTemplate;
}

function serializeField(_ref4) {
  var name = _ref4.name,
      icon = _ref4.icon,
      hopSize = _ref4.hopSize,
      lastValidHopSize = _ref4.lastValidHopSize,
      color = _ref4.color,
      selected = _ref4.selected;
  return {
    name: name,
    hopSize: hopSize,
    lastValidHopSize: lastValidHopSize,
    color: color,
    selected: selected,
    iconClass: icon.class
  };
}

function appStateToSavedWorkspace(currentSavedWorkspace, _ref5, canSaveData) {
  var workspace = _ref5.workspace,
      urlTemplates = _ref5.urlTemplates,
      advancedSettings = _ref5.advancedSettings,
      selectedIndex = _ref5.selectedIndex,
      selectedFields = _ref5.selectedFields;
  var blacklist = canSaveData ? workspace.blacklistedNodes.map(function (node) {
    return serializeNode(node);
  }) : [];
  var vertices = canSaveData ? workspace.nodes.map(function (node) {
    return serializeNode(node, workspace.nodes);
  }) : [];
  var links = canSaveData ? workspace.edges.map(function (edge) {
    return serializeEdge(edge, workspace.nodes);
  }) : [];
  var mappedUrlTemplates = urlTemplates.map(serializeUrlTemplate);
  var persistedWorkspaceState = {
    indexPattern: selectedIndex.title,
    selectedFields: selectedFields.map(serializeField),
    blacklist: blacklist,
    vertices: vertices,
    links: links,
    urlTemplates: mappedUrlTemplates,
    exploreControls: advancedSettings
  };
  currentSavedWorkspace.wsState = JSON.stringify(persistedWorkspaceState);
  currentSavedWorkspace.numVertices = vertices.length;
  currentSavedWorkspace.numLinks = links.length;
}