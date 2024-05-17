import express from "express";
import { getMessage, sendMessage } from "../controllers/massage.control.js";

import protectRoute from "../middleware/protectRoute.js"


const router = express.Router()


router.get("/:id" , protectRoute,getMessage);
router.post("/send/:id" , protectRoute,sendMessage);


//console.log(req.params._id)

export default router;