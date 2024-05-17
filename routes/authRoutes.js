import express from "express";
import {  login, logout,sign } from "../controllers/auth.control.js";


const router = express.Router();

router.post("/login",login );
router.post("/sign",sign);


router.post("/logout",logout);

export default router;
