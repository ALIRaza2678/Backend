import express from "express";
import {
    store,
    login,
    generateOTP,
    verifyOTP,
    index,
    get,
    destroy,
    update,
} from "../Controller/user_controller.js";

import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

// Multer Upload Middleware
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
});

// Routes

// User Registration with Avatar Upload
router.post("/", upload.single("avatar"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }
        req.body.avatar = req.file.filename; // Attach file name to req.body
        await store(req, res); // Call the store controller
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Login Route
router.post("/login", login);

// Generate OTP Route
router.post("/otp", generateOTP);

// Verify OTP Route
router.post("/verify", verifyOTP);

// Fetch All Users
router.get("/", index);

// Fetch User by ID
router.get("/:id", get);

// Delete User
router.delete("/:id", destroy);

// Update User
router.put("/:id", update);

export default router;
