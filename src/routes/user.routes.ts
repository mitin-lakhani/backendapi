// routes types get post patch deleteimport { Router } from "express";
import { Router } from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/user.controller";
import { authMiddleWare } from "../middlewares/auth.middlewares";

const router = Router();

router.get("/", authMiddleWare, getUsers);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);

export default router;
