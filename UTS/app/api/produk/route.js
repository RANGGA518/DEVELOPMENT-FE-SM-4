import mysql from "mysql2/promise";

export async function GET() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "harfandi123",
    database: "uas_projek",
  });

  const [rows] = await db.execute(`
    SELECT p.*, k.nama_kategori
    FROM produk p
    LEFT JOIN kategori k ON p.kategori_id = k.id
  `);

  return Response.json(rows);
}