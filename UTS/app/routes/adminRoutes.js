const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminControllers");
const upload = require("../middlewares/upload");

router.get("/admin", adminController.dashboard);
router.get("/admin/add", adminController.formAdd);
router.post("/admin/tambah", upload.single("gambar"), adminController.store);
router.get("/admin/edit/:id", adminController.formEdit);
router.post("/admin/update/:id", upload.single("gambar"), adminController.update);
router.get("/admin/delete/:id", adminController.destroy);

module.exports = router;