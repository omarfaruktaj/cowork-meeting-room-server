import express from "express";
import { paymentController } from "./paymentController";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";

const router = express.Router();

router.post("/", authorizeWithRoles("admin", "user"), paymentController);

export default router;
