import express from "express";
import { getUser } from "../controllers/general.js";




const router = express.Router();

router.get("/user/:id", getUser);
// router.get("/", (req, res) => {
//     res.send("Hello from client routes!");
// });

export default router;
