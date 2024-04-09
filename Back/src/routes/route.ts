import { Router } from "express";
import UsersRouter from "./users/route"

const router = Router();

router.use("/users", UsersRouter)

export default router