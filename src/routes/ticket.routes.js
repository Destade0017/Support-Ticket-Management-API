import { Router } from "express";
import { createTicket, getAllTicket, assignTicket } from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", createTicket);
router.get("/all", getAllTicket);
router.post("/:id/assign", assignTicket)

export default router;
