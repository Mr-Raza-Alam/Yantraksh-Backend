import {Router} from "express";
import {validate} from "../../middlewares/validate";
import {CompetitionController } from "./competition.controller";
import {competitionIdParamSchema, createCompetitionSchema, updateCompetitionSchema } from "./competition.validator";
import { requireAdmin, requireUser } from "../../middlewares/requireUser";

const router = Router();
const controller = new CompetitionController();

router.get("/", controller.getAllCompetitions);
router.get("/:id", validate(competitionIdParamSchema), controller.getCompetitionById);
router.post("/", validate(createCompetitionSchema),requireUser,requireAdmin, controller.createCompetition);
router.patch("/:id", validate(competitionIdParamSchema), validate(updateCompetitionSchema),requireUser,requireAdmin,controller.updateCompetition );
router.delete("/:id", validate(competitionIdParamSchema),requireUser,requireAdmin, controller.deleteCompetition);

export default router;

