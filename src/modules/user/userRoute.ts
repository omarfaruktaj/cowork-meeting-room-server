import express from "express";
import { loginController, signupController } from "./userController";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema, loginValidationSchema } from "./userValidation";

const router = express.Router();

router.post("/signup", validateRequest(userValidationSchema), signupController);
router.post("/login", validateRequest(loginValidationSchema), loginController);

export default router;
