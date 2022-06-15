import { Router } from "express";
import * as authController from "../controllers/Auth.controller";
const router = Router();

router.post("/register", authController.register);
router.post("/Login", authController.login);

export default router;
