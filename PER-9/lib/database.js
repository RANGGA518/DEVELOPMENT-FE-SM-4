import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "harfandi123",
    database: "uas_projek",
})

export default pool;

