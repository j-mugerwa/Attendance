const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const cloudinary = require('../config/cloudinary');
const { getFaceEmbedding } = require('../utils/faceRecognition');

const registerUser = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Upload image to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "smart_attendance" }, async (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(req.file.buffer);
    });

    const imageUrl = uploadResponse.secure_url;

    let faceDescriptor = await getFaceEmbedding(imageUrl);
    if (!faceDescriptor) {
      return res.status(400).json({ message: "No face detected in image" });
    }

    const user = new User({ name, imageUrl, faceDescriptor });
    console.log("User saved: ", user);
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

//Get the users.
const getUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
});

//Exports
module.exports = {
    registerUser,
    getUsers,
}

