import express from "express";
import { loginController, registerController, userController } from "../controllers";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);

export default router;