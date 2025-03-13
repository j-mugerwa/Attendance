import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import { checkInAttendance } from "../redux/slices/attendanceSlice";

const AttendanceCapture = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { checkInStatus, checkInError } = useSelector((state) => state.records);

  useEffect(() => {
    if (cameraOn) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      };
      startCamera();
    }
  }, [cameraOn]);

  const capturePhoto = () => {
    if (!cameraOn) {
      setCameraOn(true);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Capture a larger image first
    context.drawImage(video, 0, 0, 400, 500);

    // Resize to passport-size (200x250)
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 200;
    tempCanvas.height = 250;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(canvas, 0, 0, 200, 250);

    tempCanvas.toBlob((blob) => {
      setImage(blob);
      setPreview(URL.createObjectURL(blob));
    }, "image/jpeg");

    // Stop the camera after capturing
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      setCameraOn(false);
    }
  };

  const handleSubmit = () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    dispatch(checkInAttendance(formData));
  };

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h5" gutterBottom>
        CAPTURE ATTENDANCE
      </Typography>

      {cameraOn && (
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            borderRadius: 8,
            border: "2px solid #ccc",
            marginTop: "10px",
          }}
        ></video>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} width={400} height={500}></canvas>

      {preview && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "200px",
            height: "250px",
            border: "2px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            margin: "20px auto",
          }}
        >
          <img src={preview} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      )}

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={capturePhoto} sx={{ mr: 2 }}>
          {cameraOn ? "Capture Photo" : "Start Camera"}
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={checkInStatus === "loading" || !image}
        >
          {checkInStatus === "loading" ? <CircularProgress size={24} /> : "Submit Attendance"}
        </Button>
      </Box>

      {checkInError && <Typography color="error" mt={2}>{checkInError}</Typography>}
      {checkInStatus === "succeeded" && <Typography color="primary" mt={2}>Attendance Logged Successfully!</Typography>}
    </Box>
  );
};

export default AttendanceCapture;
