import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { TeamMemberController } from "./teamMember.controller";
import {
  teamMemberIdParamSchema,
  teamIdParamSchema,
  userIdParamSchema,
  teamIdAndUserIdParamSchema,
  createTeamMemberSchema,
} from "./teamMember.validator";
import { requireUser } from "../../middlewares/requireUser";

const router = Router();
const controller = new TeamMemberController();

router.post("/", validate(createTeamMemberSchema), controller.createTeamMember);
router.get("/", controller.getAllTeamMembers);
router.get("/:id", validate(teamMemberIdParamSchema), controller.getTeamMemberById);
router.get("/team/:teamId", validate(teamIdParamSchema), controller.getTeamMembersByTeam);
router.get("/user/:userId", validate(userIdParamSchema), controller.getTeamMembersByUser);
router.delete("/:id", validate(teamMemberIdParamSchema),requireUser, controller.deleteTeamMember);
router.delete( "/team/:teamId/user/:userId", validate(teamIdAndUserIdParamSchema),requireUser, controller.deleteTeamMemberByTeamAndUser);

export default router;
