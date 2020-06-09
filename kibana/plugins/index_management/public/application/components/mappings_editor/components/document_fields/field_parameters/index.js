"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PARAMETER_SERIALIZERS: true,
  PARAMETER_DESERIALIZERS: true
};
exports.PARAMETER_DESERIALIZERS = exports.PARAMETER_SERIALIZERS = void 0;

var _relations_parameter = require("./relations_parameter");

Object.keys(_relations_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _relations_parameter[key];
    }
  });
});

var _dynamic_parameter = require("./dynamic_parameter");

Object.keys(_dynamic_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dynamic_parameter[key];
    }
  });
});

var _name_parameter = require("./name_parameter");

Object.keys(_name_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _name_parameter[key];
    }
  });
});

var _index_parameter = require("./index_parameter");

Object.keys(_index_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index_parameter[key];
    }
  });
});

var _store_parameter = require("./store_parameter");

Object.keys(_store_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _store_parameter[key];
    }
  });
});

var _doc_values_parameter = require("./doc_values_parameter");

Object.keys(_doc_values_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _doc_values_parameter[key];
    }
  });
});

var _boost_parameter = require("./boost_parameter");

Object.keys(_boost_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _boost_parameter[key];
    }
  });
});

var _analyzer_parameter = require("./analyzer_parameter");

Object.keys(_analyzer_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _analyzer_parameter[key];
    }
  });
});

var _analyzers_parameter = require("./analyzers_parameter");

Object.keys(_analyzers_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _analyzers_parameter[key];
    }
  });
});

var _null_value_parameter = require("./null_value_parameter");

Object.keys(_null_value_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _null_value_parameter[key];
    }
  });
});

var _eager_global_ordinals_parameter = require("./eager_global_ordinals_parameter");

Object.keys(_eager_global_ordinals_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eager_global_ordinals_parameter[key];
    }
  });
});

var _norms_parameter = require("./norms_parameter");

Object.keys(_norms_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _norms_parameter[key];
    }
  });
});

var _similarity_parameter = require("./similarity_parameter");

Object.keys(_similarity_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _similarity_parameter[key];
    }
  });
});

var _path_parameter = require("./path_parameter");

Object.keys(_path_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _path_parameter[key];
    }
  });
});

var _coerce_number_parameter = require("./coerce_number_parameter");

Object.keys(_coerce_number_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _coerce_number_parameter[key];
    }
  });
});

var _coerce_shape_parameter = require("./coerce_shape_parameter");

Object.keys(_coerce_shape_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _coerce_shape_parameter[key];
    }
  });
});

var _format_parameter = require("./format_parameter");

Object.keys(_format_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _format_parameter[key];
    }
  });
});

var _ignore_malformed = require("./ignore_malformed");

Object.keys(_ignore_malformed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ignore_malformed[key];
    }
  });
});

var _copy_to_parameter = require("./copy_to_parameter");

Object.keys(_copy_to_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _copy_to_parameter[key];
    }
  });
});

var _term_vector_parameter = require("./term_vector_parameter");

Object.keys(_term_vector_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _term_vector_parameter[key];
    }
  });
});

var _type_parameter = require("./type_parameter");

Object.keys(_type_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _type_parameter[key];
    }
  });
});

var _ignore_z_value_parameter = require("./ignore_z_value_parameter");

Object.keys(_ignore_z_value_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ignore_z_value_parameter[key];
    }
  });
});

var _orientation_parameter = require("./orientation_parameter");

Object.keys(_orientation_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _orientation_parameter[key];
    }
  });
});

var _fielddata_parameter = require("./fielddata_parameter");

Object.keys(_fielddata_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fielddata_parameter[key];
    }
  });
});

var _split_queries_on_whitespace_parameter = require("./split_queries_on_whitespace_parameter");

Object.keys(_split_queries_on_whitespace_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _split_queries_on_whitespace_parameter[key];
    }
  });
});

var _locale_parameter = require("./locale_parameter");

Object.keys(_locale_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _locale_parameter[key];
    }
  });
});

var _enabled_parameter = require("./enabled_parameter");

Object.keys(_enabled_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _enabled_parameter[key];
    }
  });
});

var _max_shingle_size_parameter = require("./max_shingle_size_parameter");

Object.keys(_max_shingle_size_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _max_shingle_size_parameter[key];
    }
  });
});

var _other_type_name_parameter = require("./other_type_name_parameter");

Object.keys(_other_type_name_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _other_type_name_parameter[key];
    }
  });
});

var _other_type_json_parameter = require("./other_type_json_parameter");

Object.keys(_other_type_json_parameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _other_type_json_parameter[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PARAMETER_SERIALIZERS = [_relations_parameter.relationsSerializer, _dynamic_parameter.dynamicSerializer];
exports.PARAMETER_SERIALIZERS = PARAMETER_SERIALIZERS;
var PARAMETER_DESERIALIZERS = [_relations_parameter.relationsDeserializer, _dynamic_parameter.dynamicDeserializer];
exports.PARAMETER_DESERIALIZERS = PARAMETER_DESERIALIZERS;