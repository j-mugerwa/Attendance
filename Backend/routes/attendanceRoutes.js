const express = require('express');
const {
  checkIn,
  getAttendanceRecords,
  getAttendanceSummary,
  getUserAttendanceHistory,
  getAbsenteeReport,
  getAttendanceTrends
} = require('../controllers/attendanceController');

const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/checkin", upload.single("image"), checkIn);
router.get('/records', getAttendanceRecords);
router.get('/summary', getAttendanceSummary);
router.get('/user/:userId', getUserAttendanceHistory);
router.get('/absentees', getAbsenteeReport);
router.get('/trends', getAttendanceTrends);

module.exports = router;
