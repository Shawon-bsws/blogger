'use strict';

const path = require('path');
const dotenv = require('dotenv');
const dotenvPath = path.resolve(process.cwd(), './configs/.env');
const result = dotenv.config({ path: dotenvPath });
if (result.error) {
  throw result.error;
}
const config = {
  PORT: parseInt(process.env.PORT),
  DATABASE: {
    NAME: process.env.DATABASENAME,
    USERNAME: process.env.DBUSERNAME,
    PASSWORD: process.env.DBPASSWORD,
    PORT: process.env.DBPORT,
    HOSTNAME: process.env.DBHOSTNAME,
    TIMEZONE: process.env.TIMEZONE,
    MAX: parseInt(process.env.MAX),
    MIN: parseInt(process.env.MIN),
    IDLE: parseInt(process.env.IDLE),
  },

  SECRETE: process.env.SECKEY,
  URL: process.env.URL,
  SALTROUND: parseInt(process.env.SALTROUND),
  VIEWDEFAULTVALUE: {
    LIMIT: parseInt(process.env.PARPAGELIMIT),
    ORDER: process.env.VIEWORDER,
    ORDERCOLUMN: process.env.ORDERCOLUMN,
    PAGE: parseInt(process.env.PAGE),
  },
};

module.exports = config;
