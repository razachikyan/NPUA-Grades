import { Router } from "express";
import GroupController from "../../controllers/groups";

const router = Router();

router.get("/", GroupController.getGroups);
router.get("/:group_id", GroupController.getGroupById);
router.post("/", GroupController.createGroup);

export default router;
