import { Router } from "express";
import UserController from "../../controllers/users";

const router = Router();

// Route to create a new user
router.post("/", UserController.createUser);

// Route to authenticate a user
router.post("/login", UserController.authenticateUser);

export default router;
