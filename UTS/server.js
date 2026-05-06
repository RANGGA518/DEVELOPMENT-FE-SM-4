require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= PASTIKAN FOLDER UPLOAD ADA =================
const uploadPath = path.join(__dirname, "../shared/uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Folder uploads dibuat");
}

// ================= STATIC FILE =================
app.use("/uploads", express.static(uploadPath));

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));

// ================= ROUTES =================

// API (untuk frontend Next.js)
app.use("/api/produk", require("./app/routes/produkRoutes"));
app.use("/api/kategori", require("./app/routes/kategoriRoutes"));

// ADMIN (EJS)
app.use("/", require("./app/routes/adminRoutes"));

// ================= TEST ROOT =================
// ⚠️ pindahin ke route lain biar gak bentrok
app.get("/test", (req, res) => {
  res.send("Backend Minimarket Running");
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Terjadi error di server");
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
  console.log(`Uploads di http://localhost:${PORT}/uploads`);
});