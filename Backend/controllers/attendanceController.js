const asyncHandler = require("express-async-handler");
const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel'); // Bring in the users.
const { getFaceEmbedding, compareFaces } = require('../utils/faceRecognition');
const cloudinary = require('../config/cloudinary');

const checkIn = asyncHandler(async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image provided" });

    // Upload image to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "attendance_faces", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const imageUrl = uploadResponse.secure_url;
    let newEmbedding = await getFaceEmbedding(imageUrl);

    if (!newEmbedding) return res.status(400).json({ message: "No face detected" });

    // Convert newEmbedding to Float32Array for comparison
    newEmbedding = new Float32Array(newEmbedding);

    const users = await User.find({}, "name imageUrl faceDescriptor");
    let recognizedUser = null;

    for (const user of users) {
      if (user.faceDescriptor) {
        const storedEmbedding = new Float32Array(user.faceDescriptor); // Ensure it's Float32Array

        console.log(
          `Comparing lengths: stored=${storedEmbedding.length}, new=${newEmbedding.length}`
        );

        if (storedEmbedding.length === newEmbedding.length && compareFaces(storedEmbedding, newEmbedding)) {
          recognizedUser = user;
          break;
        }
      }
    }

    if (!recognizedUser) return res.status(404).json({ message: "User not recognized" });

    const attendance = new Attendance({ user: recognizedUser._id });
    await attendance.save();
    console.log(".. Attendance captured ..")

    res.status(201).json({
      message: "Attendance logged successfully",
      user: {
        name: recognizedUser.name,
        imageUrl: recognizedUser.imageUrl,
      },
      attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging attendance", error });
  }
});

//Get Attendance
const getAttendanceRecords = asyncHandler(async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const records = await Attendance.find(query).populate('user', 'name imageUrl');
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance records", error });
  }
});

// Get summary statistics
/*
const getAttendanceSummary = asyncHandler(async (req, res) => {
  const totalRecords = await Attendance.countDocuments();
  const presentCount = await Attendance.countDocuments({ status: "present" });
  const absentCount = await Attendance.countDocuments({ status: "absent" });
  const lateCount = await Attendance.countDocuments({ status: "late" });

  res.status(200).json({ totalRecords, presentCount, absentCount, lateCount });
});
*/

const getAttendanceSummary = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    // Users who have checked in today
    const presentUsers = await Attendance.find({
      timestamp: { $gte: today }
    }).distinct("user");

    // Total users in the system
    const totalUsers = await User.countDocuments();

    // Absent users = totalUsers - presentUsers
    const absentCount = totalUsers - presentUsers.length;

    res.status(200).json({
      totalRecords: totalUsers,
      presentCount: presentUsers.length,
      absentCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance summary", error });
  }
});


// Get user-specific attendance history
const getUserAttendanceHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const records = await Attendance.find({ userId }).sort({ timestamp: -1 });
  res.status(200).json(records);
});

// Get absentee report
const getAbsenteeReport = asyncHandler(async (req, res) => {
  const allUsers = await User.find({}, "_id name");
  const presentUsers = await Attendance.find({ status: "present" }).distinct("userId");
  const absentUsers = allUsers.filter(user => !presentUsers.includes(user._id.toString()));

  res.status(200).json(absentUsers);
});

// Get attendance trends (weekly/monthly)
const getAttendanceTrends = asyncHandler(async (req, res) => {
  const { period } = req.query; // 'weekly' or 'monthly'
  let groupBy = {};

  if (period === "weekly") {
    groupBy = { $week: "$timestamp" };
  } else if (period === "monthly") {
    groupBy = { $month: "$timestamp" };
  }

  const trends = await Attendance.aggregate([
    { $group: { _id: groupBy, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json(trends);
});

module.exports = {
  checkIn,
  getAttendanceRecords,
  getAttendanceSummary,
  getUserAttendanceHistory,
  getAbsenteeReport,
  getAttendanceTrends,
};
