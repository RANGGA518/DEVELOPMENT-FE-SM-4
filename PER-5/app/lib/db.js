import mysql from 'mysql2/promise';

export async function query(sql, values) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'harfandi123',
        database: 'uas_projek'
    });

    const [results] = await connection.execute(sql, values);
    return results;
}