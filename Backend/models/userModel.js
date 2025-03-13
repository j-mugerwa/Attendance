const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    default: "https://res.cloudinary.com/dergbovjg/image/upload/v1729437862/hosp_c17ewa.jpg",
  }, // Cloudinary-hosted image URL
  //Face discriptors for comparison
  faceDescriptor: {
    type: [Number], // Array of numbers representing face embeddings
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
