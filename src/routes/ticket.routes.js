import { Router } from "express";
import { createTicket, getOneTicket, getAllTicket, updateTicket, deleteTicket, assignTicket } from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", createTicket);
router.get("/:id", getOneTicket)
router.get("/all", getAllTicket);
router.patch("/:id", updateTicket)
router.delete("/:id", deleteTicket)
router.post("/:id/assign", assignTicket)

export default router;
