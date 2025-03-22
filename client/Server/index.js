import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"; // Can be removed entirely since express.json() is used
import videoroutes from './Routes/video.js';
import userroutes from "./Routes/User.js";
import path from 'path';
import commentroutes from './Routes/comment.js';



dotenv.config();
const app = express();

// Enable CORS
app.use(cors());

// Body parsing middleware (you already have express.json() and express.urlencoded())
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join('uploads')));

// Test route
app.get('/', (req, res) => {
    res.send("Your tube is working");
});

// Set up routes for user, video, and comment
app.use('/user', userroutes);
app.use('/video', videoroutes);
app.use('/comment', commentroutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});

// Correct MongoDB connection URL from .env or default
const DB_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/youtube_clone_db";

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Database connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
        process.exit(1);  // Exit the process if MongoDB connection fails
    });
