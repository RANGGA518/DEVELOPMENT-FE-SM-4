const db = require("../config/db");
const fs = require("fs");
const path = require("path");

//
const uploadPath = path.join(__dirname, "../../../shared/uploads");

// ===== DASHBOARD =====
exports.dashboard = async (req, res) => {
  try {
    const [produk] = await db.query(`
      SELECT p.*, k.nama_kategori
      FROM produk p
      LEFT JOIN kategori k ON p.kategori_id = k.id
      ORDER BY p.kode_barang DESC
    `);

    res.render("index", { produk });
  } catch (err) {
    console.log(err);
    res.send("Error halaman admin");
  }
};

// ===== FORM ADD =====
exports.formAdd = async (req, res) => {
  try {
    const [kategori] = await db.query("SELECT * FROM kategori");
    res.render("add", { kategori });
  } catch (err) {
    console.log(err);
    res.send("Error halaman add");
  }
};

// ===== STORE =====
exports.store = async (req, res) => {
  try {
    const {
      kode_barang,
      nama_barang,
      harga,
      harga_modal,
      stok,
      kategori_id,
      deskripsi,
    } = req.body;

    const gambar = req.file ? req.file.filename : null;

    // 🔥 pastikan folder shared ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    await db.query(
      `INSERT INTO produk 
      (kode_barang, nama_barang, harga, harga_modal, stok, kategori_id, deskripsi, gambar)
      VALUES (?,?,?,?,?,?,?,?)`,
      [
        kode_barang,
        nama_barang,
        harga,
        harga_modal,
        stok,
        kategori_id,
        deskripsi,
        gambar,
      ]
    );

    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.send("Gagal tambah produk");
  }
};

// ===== FORM EDIT =====
exports.formEdit = async (req, res) => {
  try {
    const [produk] = await db.query(
      "SELECT * FROM produk WHERE kode_barang=?",
      [req.params.id]
    );

    const [kategori] = await db.query("SELECT * FROM kategori");

    res.render("edit", {
      p: produk[0],
      kategori,
    });
  } catch (err) {
    console.log(err);
    res.send("Error halaman edit");
  }
};

// ===== UPDATE =====
exports.update = async (req, res) => {
  try {
    const {
      nama_barang,
      harga,
      harga_modal,
      stok,
      kategori_id,
      deskripsi,
    } = req.body;

    const gambar = req.file ? req.file.filename : null;

    if (gambar) {
      // 
      const [old] = await db.query(
        "SELECT gambar FROM produk WHERE kode_barang=?",
        [req.params.id]
      );

      const oldGambar = old[0]?.gambar;

      // 
      if (oldGambar) {
        const oldPath = path.join(uploadPath, oldGambar);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      await db.query(
        `UPDATE produk SET 
          nama_barang=?, harga=?, harga_modal=?, stok=?, 
          kategori_id=?, deskripsi=?, gambar=? 
          WHERE kode_barang=?`,
        [
          nama_barang,
          harga,
          harga_modal,
          stok,
          kategori_id,
          deskripsi,
          gambar,
          req.params.id,
        ]
      );
    } else {
      await db.query(
        `UPDATE produk SET 
          nama_barang=?, harga=?, harga_modal=?, stok=?, 
          kategori_id=?, deskripsi=? 
          WHERE kode_barang=?`,
        [
          nama_barang,
          harga,
          harga_modal,
          stok,
          kategori_id,
          deskripsi,
          req.params.id,
        ]
      );
    }

    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.send("Gagal update produk");
  }
};

// ===== DELETE =====
exports.destroy = async (req, res) => {
  try {
    const [produk] = await db.query(
      "SELECT gambar FROM produk WHERE kode_barang=?",
      [req.params.id]
    );

    const gambar = produk[0]?.gambar;

    // 🔥 hapus file dari shared uploads
    if (gambar) {
      const filePath = path.join(uploadPath, gambar);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await db.query("DELETE FROM produk WHERE kode_barang=?", [
      req.params.id,
    ]);

    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.send("Gagal hapus produk");
  }
};