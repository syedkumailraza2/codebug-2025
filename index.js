import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DB/database.js";
import { register } from "./Controller/student.controller.js";
import { eventRouter } from "./Routes/event.router.js";
import studyMaterialRoutes from "./Routes/studyMaterial.route.js";
import projectRoutes from "./Routes/project.routes.js"; 
import { v2 as cloudinary } from "cloudinary"; 
dotenv.config();

// ✅ Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Connect to Database
connectDB()
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if DB fails
    });

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Hello, API is running!");
});

// ✅ Routes
app.use("/notes", studyMaterialRoutes);
app.use("/event", eventRouter);
app.use("/projects", projectRoutes); // ✅ Project Routes added
app.post("/register", register);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
