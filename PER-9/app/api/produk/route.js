import pool from "@/lib/database";

// GET semua produk
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM produk");

    return Response.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}

// POST tambah produk
export async function POST(req) {
  try {
    const body = await req.json();
    const { kode_barang, nama_barang } = body;

    await pool.query(
      "INSERT INTO produk (kode_barang, nama_barang) VALUES (?, ?)",
      [kode_barang, nama_barang]
    );

    return Response.json({
      success: true,
      message: "Produk berhasil ditambahkan",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}