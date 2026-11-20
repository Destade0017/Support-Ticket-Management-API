import { Ticket } from "../models/Ticket.js";
import { Reply } from "../models/Reply.js";
import mongoose from "mongoose";

//create a reply
const createReply = async (req, res) => {
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

      const newReply = new Reply.create({
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
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

//get all replies
const getReplies = async (req, res) => {
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

    const tickets = await Reply.find({ ticket: id }).sort({ createdAt: 1 })

    return res.status(200).json({
      success: true,
      message: "Replies fetched successfully",
      data: tickets
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

export { createReply, getReplies }
