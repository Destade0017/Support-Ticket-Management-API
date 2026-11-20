import { Router } from "express";
import { getReplies, createReply } from "../controllers/reply.controller.js";


const router = Router();

//reply routes
router.post("/:id/replies", createReply)
router.get("/:id/replies", getReplies)

export default router;
