const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config(); // Automatically reads CLOUDINARY_URL

module.exports = cloudinary;
