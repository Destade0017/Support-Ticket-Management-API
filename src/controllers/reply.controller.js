import { Ticket } from "../models/Ticket.js";
import { Reply } from "../models/Reply.js";
import mongoose from "mongoose";

//create a reply
const createReply = async (req, res) => {
  try {

    const { id } = req.params;

    const { message, author } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Mongoose ID"
      });
    }

    if (!message || !author) {
      return res.status(400).json({
        success: false,
        message: "Message and author are required"
      })
    }

    //make sure ticket exist
    const ticket = await Ticket.findById(id);

    if(!ticket){
      return res.status(400).json({
        success: false,
        message: "Ticket not found"
      })
    }

    //create a reply
    const reply = await Reply.create({
      ticket: id,
      message,
      author,
    });

    //send a response
    res.status(201).json({
      success: true,
      message: "Reply created successfully",
      data: reply,
    })

  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Error creating reply",
      error: error.message,
     })
  }
}

//get replies
const getReplies = async (req, res) => {
  try {
    const { id } = req.params;

    //check for valid mongoose id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Mongoose ID",
      })
    }

    const replies = await Reply.find();

    return res.status(200).json({
      success: true,
      message: "Replies fetched successfully",
      data: replies,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting replies",
      error: error.message,
    })
  }
}

export { createReply, getReplies }
