import express from "express";
import { body } from "express-validator";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import validateRequest from "../middleware/validateRequest.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("phone").notEmpty(),
    body("salary").isNumeric(),
    body("department").notEmpty(),
    body("position").notEmpty(),
    body("dateOfJoining").isISO8601(),
  ],
  validateRequest,
  createEmployee
);

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
