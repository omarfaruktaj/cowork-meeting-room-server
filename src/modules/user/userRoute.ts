import express from "express";
import { getMe, loginController, signupController } from "./userController";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema, loginValidationSchema } from "./userValidation";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";

const router = express.Router();

router.post("/signup", validateRequest(userValidationSchema), signupController);
router.post("/login", validateRequest(loginValidationSchema), loginController);
router.get("/me", authorizeWithRoles("admin", "user"), getMe);
export default router;
