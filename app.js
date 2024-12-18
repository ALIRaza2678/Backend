import express from "express";
import connectdb from "./Config/Connectdb.js";
import Router from "./Routes/index_routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import adminrouter from "./Routes/index_routes.js";
import cabsRouter from "./Routes/index_routes.js"
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Connect to the database
connectdb();

// Static file serving
app.use("/upload", express.static(path.resolve(__dirname, "uploads")));

// Routes
app.use('/api/admin', Router);
app.use('/api',adminrouter)
app.use('/api/admin',cabsRouter)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
