import express from "express";
import {
  createRoomController,
  getARoomController,
  getAllRoomController,
} from "./roomController";
import authorizeWithRoles from "../../middlewares/authorizeWithRoles";
import { USER_ROLE } from "../user/userConstant";
import { roomValidationSchema } from "./roomValidation";
import validateRequest from "../../middlewares/validateRequest";
import validateMongoDBId from "../../middlewares/validateMongoId";

const router = express.Router();

router
  .route("/rooms")
  .post(
    authorizeWithRoles(USER_ROLE.admin),
    validateRequest(roomValidationSchema),
    createRoomController,
  )
  .get(getAllRoomController);

router.route("/rooms/:id").get(validateMongoDBId("id"), getARoomController);

export default router;
