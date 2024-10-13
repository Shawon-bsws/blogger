const Sequelize = require("sequelize");
const config = require("./config");
const sequelize = new Sequelize(
  config.DATABASE.NAME,
  config.DATABASE.USERNAME,
  config.DATABASE.PASSWORD,
  {
    logging: function (query) {
      console.log("sql log: ", query);
    },
    host: config.DATABASE.HOSTNAME,
    port: config.DATABASE.PORT,
    dialect: "mysql",
    omitNull: true,
    // timezone: config.DATABASE.TIMEZONE,
    pool: {
      max: config.DATABASE.MAX,
      min: config.DATABASE.MIN,
      idle: config.DATABASE.IDLE,
    },
    define: {
      timestamps: false,
    },
  }
);

sequelize.beforeFind(async (options) => {
  // options.raw = true;
  console.log("================");
  console.log(options);
  console.log("================");
});

module.exports = sequelize;
