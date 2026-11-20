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
      
     }


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}
