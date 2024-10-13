'use strict';

const Connection = require('../../../../configs/mysql.connection');
const dictionary = require('./user.master.dictionary.json');
const { getSequelizeType } = require('../../../../helpers/helperFunctions');

const fieldDefs = dictionary.field_defs;

const sequelizeFields = {};
Object.keys(fieldDefs).forEach((fieldName) => {
  if (fieldDefs[fieldName].db_fields) {
    const dbFields = fieldDefs[fieldName].db_fields;
    let fieldConfig = {
      field: fieldName,
      type: getSequelizeType(dbFields.type),
      allowNull: !dbFields.required,
      defaultValue: dbFields?.default ? dbFields?.default : null,
    };
    if (fieldName === 'user_master_id') {
      delete fieldConfig.defaultValue;
      fieldConfig = {
        ...fieldConfig,
        primaryKey: true,
        autoIncrement: true,
      };
    }

    sequelizeFields[fieldName] = fieldConfig;
  }
});

const Users = Connection.define('user_masters', sequelizeFields, {
  collate: 'en_US',
  version: false,
});

module.exports = Users;
