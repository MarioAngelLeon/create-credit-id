let typeorm = require("typeorm");

let DBConnection = new typeorm.DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  synchronize: (process.env.DB_SYNC || "").toUpperCase() === "TRUE",
  entities: [require("../models/udi.entity")],
});

module.exports = DBConnection;
