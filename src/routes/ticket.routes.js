import { Router } from "express";
import { createTicket, getAllTicket } from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", createTicket);
router.get("/all", getAllTicket);

export default router;
