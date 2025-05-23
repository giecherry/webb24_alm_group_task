const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

let host = process.env.DB_HOST;
let username = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let database = process.env.DB_NAME;

if (process.env.NODE_ENV === "test") {
  host = "localhost";
  database = "test_db";
}

const sequelize = new Sequelize({
  dialect: "postgres",
  host: host,
  username: username,
  password: password,
  database: database,
  logging: false,
});

module.exports = sequelize;
