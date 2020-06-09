"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summarizeCopyResult = summarizeCopyResult;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function summarizeCopyResult(savedObject, copyResult, includeRelated) {
  var successful = Boolean(copyResult && copyResult.failedImports.length === 0);
  var conflicts = copyResult ? copyResult.failedImports.filter(function (failed) {
    return failed.error.type === 'conflict';
  }) : [];
  var unresolvableErrors = copyResult ? copyResult.failedImports.filter(function (failed) {
    return failed.error.type !== 'conflict';
  }) : [];
  var hasConflicts = conflicts.length > 0;
  var hasUnresolvableErrors = Boolean(copyResult && copyResult.failedImports.some(function (failed) {
    return failed.error.type !== 'conflict';
  }));
  var objectMap = new Map();
  objectMap.set("".concat(savedObject.type, ":").concat(savedObject.id), {
    type: savedObject.type,
    id: savedObject.id,
    name: savedObject.meta.title,
    conflicts: conflicts.filter(function (c) {
      return c.obj.type === savedObject.type && c.obj.id === savedObject.id;
    }),
    hasUnresolvableErrors: unresolvableErrors.some(function (e) {
      return e.obj.type === savedObject.type && e.obj.id === savedObject.id;
    })
  });

  if (includeRelated) {
    savedObject.references.forEach(function (ref) {
      objectMap.set("".concat(ref.type, ":").concat(ref.id), {
        type: ref.type,
        id: ref.id,
        name: ref.name,
        conflicts: conflicts.filter(function (c) {
          return c.obj.type === ref.type && c.obj.id === ref.id;
        }),
        hasUnresolvableErrors: unresolvableErrors.some(function (e) {
          return e.obj.type === ref.type && e.obj.id === ref.id;
        })
      });
    }); // The `savedObject.references` array only includes the direct references. It does not include any references of references.
    // Therefore, if there are conflicts detected in these transitive references, we need to include them here so that they are visible
    // in the UI as resolvable conflicts.

    var transitiveConflicts = conflicts.filter(function (c) {
      return !objectMap.has("".concat(c.obj.type, ":").concat(c.obj.id));
    });
    transitiveConflicts.forEach(function (conflict) {
      objectMap.set("".concat(conflict.obj.type, ":").concat(conflict.obj.id), {
        type: conflict.obj.type,
        id: conflict.obj.id,
        name: conflict.obj.title || conflict.obj.id,
        conflicts: conflicts.filter(function (c) {
          return c.obj.type === conflict.obj.type && conflict.obj.id;
        }),
        hasUnresolvableErrors: unresolvableErrors.some(function (e) {
          return e.obj.type === conflict.obj.type && e.obj.id === conflict.obj.id;
        })
      });
    });
  }

  if (typeof copyResult === 'undefined') {
    return {
      processing: true,
      objects: Array.from(objectMap.values())
    };
  }

  if (successful) {
    return {
      successful: successful,
      hasConflicts: false,
      objects: Array.from(objectMap.values()),
      hasUnresolvableErrors: false,
      processing: false
    };
  }

  return {
    successful: successful,
    hasConflicts: hasConflicts,
    objects: Array.from(objectMap.values()),
    hasUnresolvableErrors: hasUnresolvableErrors,
    processing: false
  };
}