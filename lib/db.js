import mysql from 'mysql2/promise'

export async function connect() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'harfandi123',
        database: 'uas_projek'
    })
    return connection
}