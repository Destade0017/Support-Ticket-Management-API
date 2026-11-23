import { Router } from "express";
import { createTicket, getOneTicket, getAllTicket, updateTicket, deleteTicket, assignTicket } from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", createTicket);
router.get("/", getAllTicket);
router.get("/:id", getOneTicket);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.patch("/:id/assign", assignTicket);

export default router;
