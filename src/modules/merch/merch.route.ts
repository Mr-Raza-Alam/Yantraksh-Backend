import { Router } from "express";
import { MerchController } from "./merch.controller";
import { validate } from "../../middlewares/validate";
// import { requireUser } from "../../middlewares/requireUser";
import {
  createMerchSchema,
  updateMerchSchema
} from "./merch.validator.ts";

const router = Router();
const controller = new MerchController();

// Public Routes
router.get("/", controller.getAllMerch);
router.get("/:id", controller.getMerchById);

// Admin / Protected
router.post(
  "/",
  validate(createMerchSchema),
  controller.createMerch
);

router.patch(
  "/:id",
  validate(updateMerchSchema),
  controller.updateMerch
);

router.delete(
  "/:id",
  controller.deleteMerch
);

export default router;
