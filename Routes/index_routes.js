import express from "express";
import userRoute from "./routes.js"; // Adjust the path to your user routes
import adminRouter from "./admin_router.js"; // Adjust the path to your admin routes
import cabsRouter from "./cabs_router.js"
const router = express.Router();

// Use user routes under '/user'
router.use("/user", userRoute);

// Use admin routes under '/admin'
router.use("/admin", adminRouter);

router.use("/cabs", cabsRouter);

export default router;
