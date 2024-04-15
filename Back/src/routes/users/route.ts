import { Router } from "express";
import UserController from "../../controllers/users";

const router = Router();

router.get("/", UserController.getUsers);
router.get("/:session_id", UserController.getUser);
router.post("/login", UserController.login);
router.post("/login/reset", UserController.loginWithOnetimeCode);
router.post("/reset", UserController.sendCode);
router.post("/signup", UserController.createUser);
router.post("/change-pass", UserController.changePass);

export default router;
