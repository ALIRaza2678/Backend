import express from "express";
const router = express.Router();
import { storeData, getData, deleteData } from "../Controller/admin_controller.js";


router.post("/", storeData);


router.get("/", getData);


router.delete("/:id", deleteData);

export default router;
