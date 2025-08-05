import express from "express";
import { body } from "express-validator";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/authController.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  registerAdmin
);

router.post(
  "/login",
  [body("username").notEmpty(), body("password").notEmpty()],
  validateRequest,
  loginAdmin
);

router.post("/logout", logoutAdmin);

export default router;
