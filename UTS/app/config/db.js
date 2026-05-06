const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "harfandi123",
  database: "uas_projek",
});

module.exports = db;