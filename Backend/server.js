const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require("path");

const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', //frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: '10mb' }));

app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);

//Sample route
app.get("/", (req, res) => {
    res.send("Home Page Loaded")
    console.log("Home Page Loaded...")
} )

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)

        })
    })
    .catch((err) => console.log(err))