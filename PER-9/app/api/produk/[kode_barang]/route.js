import pool from "@/lib/database";

// GET 1 produk
export async function GET(req, { params }) {
  try {
    const { kode_barang } = params;

    const [rows] = await pool.query(
      "SELECT * FROM produk WHERE kode_barang = ?",
      [kode_barang]
    );

    return Response.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}

// UPDATE produk
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { nama_barang } = body;
    const { kode_barang } = params;

    await pool.query(
      "UPDATE produk SET nama_barang = ? WHERE kode_barang = ?",
      [nama_barang, kode_barang]
    );

    return Response.json({
      success: true,
      message: "Produk berhasil diperbarui",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}

// DELETE produk
export async function DELETE(req, { params }) {
  try {
    const { kode_barang } = params;

    await pool.query(
      "DELETE FROM produk WHERE kode_barang = ?",
      [kode_barang]
    );

    return Response.json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}