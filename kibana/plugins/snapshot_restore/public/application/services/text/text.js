"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textService = void 0;

var _constants = require("../../../../common/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TextService =
/*#__PURE__*/
function () {
  function TextService() {
    _classCallCheck(this, TextService);

    _defineProperty(this, "breadcrumbs", {});

    _defineProperty(this, "i18n", void 0);

    _defineProperty(this, "repositoryTypeNames", {});
  }

  _createClass(TextService, [{
    key: "setup",
    value: function setup(i18n) {
      var _this$repositoryTypeN;

      this.i18n = i18n;
      this.repositoryTypeNames = (_this$repositoryTypeN = {}, _defineProperty(_this$repositoryTypeN, _constants.REPOSITORY_TYPES.fs, i18n.translate('xpack.snapshotRestore.repositoryType.fileSystemTypeName', {
        defaultMessage: 'Shared file system'
      })), _defineProperty(_this$repositoryTypeN, _constants.REPOSITORY_TYPES.url, i18n.translate('xpack.snapshotRestore.repositoryType.readonlyTypeName', {
        defaultMessage: 'Read-only URL'
      })), _defineProperty(_this$repositoryTypeN, _constants.REPOSITORY_TYPES.s3, i18n.translate('xpack.snapshotRestore.repositoryType.s3TypeName', {
        defaultMessage: 'AWS S3'
      })), _defineProperty(_this$repositoryTypeN, _constants.REPOSITORY_TYPES.hdfs, i18n.translate('xpack.snapshotRestore.repositoryType.hdfsTypeName', {
        defaultMessage: 'Hadoop HDFS'
      })), _defineProperty(_this$repositoryTypeN, _constants.REPOSITORY_TYPES.azure, i18n.translate('xpack.snapshotRestore.repositoryType.azureTypeName', {
        defaultMessage: 'Azure'
      })), _defineProperty(_this$repositoryTypeN, _constants.REPOSITORY_TYPES.gcs, i18n.translate('xpack.snapshotRestore.repositoryType.gcsTypeName', {
        defaultMessage: 'Google Cloud Storage'
      })), _defineProperty(_this$repositoryTypeN, _constants.REPOSITORY_TYPES.source, i18n.translate('xpack.snapshotRestore.repositoryType.sourceTypeName', {
        defaultMessage: 'Source-only'
      })), _this$repositoryTypeN);
      this.breadcrumbs = {
        home: i18n.translate('xpack.snapshotRestore.home.breadcrumbTitle', {
          defaultMessage: 'Snapshot and Restore'
        }),
        snapshots: i18n.translate('xpack.snapshotRestore.snapshots.breadcrumbTitle', {
          defaultMessage: 'Snapshots'
        }),
        repositories: i18n.translate('xpack.snapshotRestore.repositories.breadcrumbTitle', {
          defaultMessage: 'Repositories'
        }),
        policies: i18n.translate('xpack.snapshotRestore.policies.breadcrumbTitle', {
          defaultMessage: 'Policies'
        }),
        restore_status: i18n.translate('xpack.snapshotRestore.restoreStatus.breadcrumbTitle', {
          defaultMessage: 'Restore Status'
        }),
        repositoryAdd: i18n.translate('xpack.snapshotRestore.addRepository.breadcrumbTitle', {
          defaultMessage: 'Add repository'
        }),
        repositoryEdit: i18n.translate('xpack.snapshotRestore.editRepository.breadcrumbTitle', {
          defaultMessage: 'Edit repository'
        }),
        restoreSnapshot: i18n.translate('xpack.snapshotRestore.restoreSnapshot.breadcrumbTitle', {
          defaultMessage: 'Restore snapshot'
        }),
        policyAdd: i18n.translate('xpack.snapshotRestore.addPolicy.breadcrumbTitle', {
          defaultMessage: 'Add policy'
        }),
        policyEdit: i18n.translate('xpack.snapshotRestore.editPolicy.breadcrumbTitle', {
          defaultMessage: 'Edit policy'
        })
      };
    }
  }, {
    key: "getRepositoryTypeName",
    value: function getRepositoryTypeName(type, delegateType) {
      var _this = this;

      var getTypeName = function getTypeName(repositoryType) {
        return _this.repositoryTypeNames[repositoryType] || type || '';
      };

      if (type === _constants.REPOSITORY_TYPES.source && delegateType) {
        return this.i18n.translate('xpack.snapshotRestore.repositoryType.sourceTypeWithDelegateName', {
          defaultMessage: '{delegateType} (Source-only)',
          values: {
            delegateType: getTypeName(delegateType)
          }
        });
      }

      return getTypeName(type);
    }
  }, {
    key: "getSizeNotationHelpText",
    value: function getSizeNotationHelpText() {
      return this.i18n.translate('xpack.snapshotRestore.repositoryForm.sizeNotationPlaceholder', {
        defaultMessage: 'Examples: {example1}, {example2}, {example3}, {example4}',
        values: {
          example1: '1g',
          example2: '10mb',
          example3: '5k',
          example4: '1024B'
        }
      });
    }
  }, {
    key: "getTimeUnitLabel",
    value: function getTimeUnitLabel(timeUnit, timeValue) {
      switch (timeUnit) {
        case _constants.TIME_UNITS.SECOND:
          return this.i18n.translate('xpack.snapshotRestore.policyForm.timeUnits.secondLabel', {
            defaultMessage: '{timeValue, plural, one {second} other {seconds}}',
            values: {
              timeValue: timeValue
            }
          });

        case _constants.TIME_UNITS.MINUTE:
          return this.i18n.translate('xpack.snapshotRestore.policyForm.timeUnits.minuteLabel', {
            defaultMessage: '{timeValue, plural, one {minute} other {minutes}}',
            values: {
              timeValue: timeValue
            }
          });

        case _constants.TIME_UNITS.HOUR:
          return this.i18n.translate('xpack.snapshotRestore.policyForm.timeUnits.hourLabel', {
            defaultMessage: '{timeValue, plural, one {hour} other {hours}}',
            values: {
              timeValue: timeValue
            }
          });

        case _constants.TIME_UNITS.DAY:
          return this.i18n.translate('xpack.snapshotRestore.policyForm.timeUnits.dayLabel', {
            defaultMessage: '{timeValue, plural, one {day} other {days}}',
            values: {
              timeValue: timeValue
            }
          });
      }
    }
  }]);

  return TextService;
}();

var textService = new TextService();
exports.textService = textService;