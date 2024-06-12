import express from "express";
import { signupController } from "./userController";
import validateRequest from "../../middlewares/validateRequest";
import userValidationSchema from "./userValidation";

const router = express.Router();

router.post("/signup", validateRequest(userValidationSchema), signupController);

export default router;
