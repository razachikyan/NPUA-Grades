import { Router } from "express";
import UserController from "../../controllers/users";

const router = Router();

router.get("/", UserController.getUser);
router.post("/login", UserController.login);
router.post("/reset", UserController.reset);
router.post("/signup", UserController.createUser);

export default router;
