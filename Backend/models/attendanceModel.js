const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
