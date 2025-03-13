const faceapi = require('@vladmandic/face-api');
const canvas = require('canvas');
const path = require('path');
const fs = require('fs');

// Configure canvas for face-api.js
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Load face recognition models
const loadModels = async () => {
  const modelPath = path.join(__dirname, '../models/facemodels'); // Adjust if needed
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
};

// Extract facial embeddings from an image
/*
const getFaceEmbedding = async (imagePath) => {
  const img = await canvas.loadImage(imagePath);
  const detections = await faceapi.detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  return detections ? detections.descriptor : null;
};
*/

/*
const getFaceEmbedding = async (imageUrl) => {
  const img = await canvas.loadImage(imageUrl);
  const detections = await faceapi.detectSingleFace(img).withFaceDescriptor();

  if (!detections) return null;

  const descriptor = detections.descriptor;

  console.log("Extracted Face Descriptor Length:", descriptor.length); // Debugging

  return Array.from(descriptor); // Ensure it's a normal array
};
*/

const getFaceEmbedding = async (imageUrl) => {
  const img = await canvas.loadImage(imageUrl);
  const detections = await faceapi.detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detections) return null;

  const descriptor = detections.descriptor;

  console.log("Extracted Face Descriptor Length:", descriptor.length); // Debugging

  return Array.from(descriptor); // Convert to array for storage
};


// Compare embeddings (L2 distance threshold)
const compareFaces = (storedDescriptor, newDescriptor, threshold = 0.6) => {
  const distance = faceapi.euclideanDistance(storedDescriptor, newDescriptor);
  return distance < threshold; // True if match found
};

// Load models at server start
loadModels()
  .then(() => console.log('Face Recognition Models Loaded'))
  .catch(err => console.error('Error loading models:', err));

module.exports = { getFaceEmbedding, compareFaces };
