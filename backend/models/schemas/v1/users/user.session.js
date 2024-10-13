'use strict';

const Connection = require('../../../../configs/mysql.connection');
const dictionary = require('./user.session.dictionary.json');
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
    if (fieldName === 'user_session_id') {
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
const UsersSession = Connection.define('user_session', sequelizeFields, {
  collate: 'en_US',
  version: false,
});

module.exports = UsersSession;
