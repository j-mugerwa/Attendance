// backend/routes/userRoutes.js
const express = require("express");
const { registerUser, getUsers } = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", upload.single("image"), registerUser);
router.get("/", getUsers);

module.exports = router;
