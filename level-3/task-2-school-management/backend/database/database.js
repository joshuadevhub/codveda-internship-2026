const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.LOCAL_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB
});

module.exports = { pool };