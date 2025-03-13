import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";
import { Box, Button, TextField, Typography, CircularProgress, Grid } from "@mui/material";
//import Footer from "../components/Footer";

const RegisterUserForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

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

  const handleCapture = () => {
    if (!cameraOn) {
      setCameraOn(true);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, 200, 250); // Capture frame
    canvas.toBlob((blob) => {
      console.log("Captured Image Blob:", blob); // Debug log
      setImage(blob);
      setPreview(URL.createObjectURL(blob));
    }, "image/jpeg"); // Ensure correct image format

    // Stop the camera after capturing the image
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      setCameraOn(false);
    }
  };

  const handleRegister = () => {
    if (!name || !image) {
      console.error("Name or image is missing");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    console.log("Submitting Form Data:", formData.get("name"), formData.get("image"));

    dispatch(registerUser(formData));
  };

  return (
    <div>
      <Box p={3} textAlign="center">
        <Typography variant="h5">USER REGISTRATION</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" fullWidth onClick={handleCapture}>
              {cameraOn ? "Capture Image" : "Start Camera"}
            </Button>
          </Grid>
        </Grid>

        {cameraOn && (
          <video
            ref={videoRef}
            autoPlay
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: 8,
              marginTop: 10
            }}>

          </video>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} width={200} height={250}></canvas>

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
            <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
        )}

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleRegister}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </div>
  );
};

export default RegisterUserForm;
