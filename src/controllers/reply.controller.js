import { Ticket } from "../models/Ticket.js";
import { Reply } from "../models/Reply.js";
import mongoose from "mongoose";

//create a reply
const createReply = async (req, res, next) => {
  try {

    const { id } = req.params;

    const { message, author } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Ticket ID"
      })
    }

    if(!message || !author) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message and author"
      })
    }

     //check if ticket exists
     const ticket = await Ticket.findById(id)

     if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      })
     }

      const newReply = await Reply.create({
        ticket: id,
        message,
        author
      })

      return res.status(201).json({
        success: true,
        message: "Reply created successfully",
        data: newReply
      })

  } catch (error) {
    next(error);
  }
}

//get all replies
const getReplies = async (req, res, next) => {
  try {
    const { id } = req.params;

    //check for valid mongoose id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Mongoose ID"
      })
    }

    //check if ticket exist
    const ticket = await Ticket.exists({ _id: id })

    if(!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      })
    }

    const replies = await Reply.find({ ticket: id }).sort({ createdAt: 1 })

    return res.status(200).json({
      success: true,
      count: replies.length,
      message: "Replies fetched successfully",
      data: replies
    })

  } catch (error) {
    next(error);
  }
}

export { createReply, getReplies }
