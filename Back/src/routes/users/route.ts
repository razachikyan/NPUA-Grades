import { Router } from "express";
import UserController from "../../controllers/users";

const router = Router();

router.get("/", UserController.getUser);
router.post("/signup", UserController.createUser);
router.post("/login", UserController.login);

export default router;
