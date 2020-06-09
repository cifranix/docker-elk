"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopulationJobCreator = void 0;

var _job_creator = require("./job_creator");

var _default_configs = require("./util/default_configs");

var _new_job = require("../../../../../../common/constants/new_job");

var _general = require("./util/general");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PopulationJobCreator =
/*#__PURE__*/
function (_JobCreator) {
  _inherits(PopulationJobCreator, _JobCreator);

  // a population job has one overall over (split) field, which is the same for all detectors
  // each detector has an optional by field
  function PopulationJobCreator(indexPattern, savedSearch, query) {
    var _this;

    _classCallCheck(this, PopulationJobCreator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PopulationJobCreator).call(this, indexPattern, savedSearch, query));

    _defineProperty(_assertThisInitialized(_this), "_splitField", null);

    _defineProperty(_assertThisInitialized(_this), "_byFields", []);

    _defineProperty(_assertThisInitialized(_this), "_type", _new_job.JOB_TYPE.POPULATION);

    _this.createdBy = _new_job.CREATED_BY_LABEL.POPULATION;
    return _this;
  } // add a by field to a specific detector


  _createClass(PopulationJobCreator, [{
    key: "setByField",
    value: function setByField(field, index) {
      if (field === null) {
        this.removeByField(index);
      } else {
        if (this._detectors[index] !== undefined) {
          this._byFields[index] = field;
          this._detectors[index].by_field_name = field.id;
        }
      }
    } // remove a by field from a specific detector

  }, {
    key: "removeByField",
    value: function removeByField(index) {
      if (this._detectors[index] !== undefined) {
        this._byFields[index] = null;
        delete this._detectors[index].by_field_name;
      }
    } // get the by field for a specific detector

  }, {
    key: "getByField",
    value: function getByField(index) {
      if (this._byFields[index] === undefined) {
        return null;
      }

      return this._byFields[index];
    } // add an over field to all detectors

  }, {
    key: "setSplitField",
    value: function setSplitField(field) {
      this._splitField = field;

      if (this._splitField === null) {
        this.removeSplitField();
      } else {
        for (var i = 0; i < this._detectors.length; i++) {
          this._detectors[i].over_field_name = this._splitField.id;
        }
      }
    } // remove over field from all detectors

  }, {
    key: "removeSplitField",
    value: function removeSplitField() {
      this._detectors.forEach(function (d) {
        delete d.over_field_name;
      });
    }
  }, {
    key: "addDetector",
    value: function addDetector(agg, field) {
      var dtr = this._createDetector(agg, field);

      this._addDetector(dtr, agg, field);

      this._byFields.push(null);
    } // edit a specific detector, reapplying the by field
    // already set on the the detector at that index

  }, {
    key: "editDetector",
    value: function editDetector(agg, field, index) {
      var dtr = this._createDetector(agg, field);

      var sp = this._byFields[index];

      if (sp !== undefined && sp !== null) {
        dtr.by_field_name = sp.id;
      }

      this._editDetector(dtr, agg, field, index);
    } // create a detector object, adding the current over field

  }, {
    key: "_createDetector",
    value: function _createDetector(agg, field) {
      var dtr = (0, _default_configs.createBasicDetector)(agg, field);

      if (this._splitField !== null) {
        dtr.over_field_name = this._splitField.id;
      }

      return dtr;
    }
  }, {
    key: "removeDetector",
    value: function removeDetector(index) {
      this._removeDetector(index);

      this._byFields.splice(index, 1);
    }
  }, {
    key: "cloneFromExistingJob",
    value: function cloneFromExistingJob(job, datafeed) {
      var _this2 = this;

      this._overrideConfigs(job, datafeed);

      this.createdBy = _new_job.CREATED_BY_LABEL.POPULATION;
      var detectors = (0, _general.getRichDetectors)(job, datafeed, this.additionalFields, false);
      this.removeAllDetectors();

      if (detectors.length) {
        if (detectors[0].overField !== null) {
          this.setSplitField(detectors[0].overField);
        }
      }

      detectors.forEach(function (d, i) {
        var dtr = detectors[i];

        if (dtr.agg !== null && dtr.field !== null) {
          _this2.addDetector(dtr.agg, dtr.field);

          if (dtr.byField !== null) {
            _this2.setByField(dtr.byField, i);
          }
        }
      });
    }
  }, {
    key: "splitField",
    get: function get() {
      return this._splitField;
    }
  }, {
    key: "aggFieldPairs",
    get: function get() {
      var _this3 = this;

      return this.detectors.map(function (d, i) {
        return {
          field: _this3._fields[i],
          agg: _this3._aggs[i],
          by: {
            field: _this3._byFields[i],
            value: null
          }
        };
      });
    }
  }]);

  return PopulationJobCreator;
}(_job_creator.JobCreator);

exports.PopulationJobCreator = PopulationJobCreator;