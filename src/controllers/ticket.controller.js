import mongoose from "mongoose";
import { Ticket } from "../models/Ticket.js";

//create a ticket
const createTicket = async (req, res) => {
  try{
    //get the needed info from the body
    const { title,  description, category, priority, status, createdBy } = req.body;

    //basic validators
  if ( !title || !description || !category || !priority || !status ) {
      return res.status(400).json({
        message: "All Fields are required"
      });
    }

    //create a new ticket
    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,
      status,
      createdBy
    })

    return res.status(201).json({
      message: "Ticket created successfully",
      ticket
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

//get one ticket
const getOneTicket = async (req, res) => {
  try{
    const { id } = req.params;

    //check if id is a valid mongoose id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Mongoose ID"
      })
    }

    const ticket = await Ticket.findById(id);

    if(!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Ticket fetched successfully",
      ticket
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

//update a ticket
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    //check for valid mongoose id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        message: "Invalid Mongoose ID"
      })
    }

    //get updated fields from the bodt of the request
    const { title, description, category, priority, status } = req.body;

    const updates = {};
    if(title) { updates.title = title; }
    if(description) { updates.description = description; }
    if(category) { updates.category = category; }
    if(priority) { updates.priority = priority; }
    if(status) { updates.status = status; }

    if(Object.keys(updates).length === 0){
      return res.status(400).json({
        success: false,
        message: "Provide at least one field"
      })
    }

    //update timestmap
    updates.updatedAt = Date.now();

    const ticket = await Ticket.findByIdAndUpdate(id,
      updates,
      {
        new: true,
        runValidators: true
      });

    if(!ticket){
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      ticket
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

//get all tickets
const getAllTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find();

    res.status(200).json({
      success: true,
      message: "All tickets fetched!",
      tickets,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

//delete a ticket
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    //check for valid mongoose id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Mongoose ID"
      })
    }

    const ticket = await Ticket.findByIdAndDelete(id);

    if(!ticket){
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
      ticket
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

//assign a ticket to an agent
const assignTicket = async (req, res) => {
  try {
    const { id } = req.params;

    //check if valid mongoose id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Mongoose ID"
      })
    }

    //get agent name from the json body
    const { agent } = req.body;

    if(!agent){
      return res.status(400).json({
        success: false,
        message: "Please provide an agent to be assigned"
      })
    }

    //check if ticket exist
    const ticket = await Ticket.findById(id);

    if(!ticket){
      return res.status(404).json({
        success: false,
        message: "Ticket does not exists"
      })
    }

    if(ticket.status === "closed"){
      return res.status(400).json({
        success: false,
        message: "Cannot assign a closed ticket"
      })
    }

    ticket.assignedTo = agent;

    if(ticket.status === "open"){
      ticket.status = "in-progress"
    }

    await ticket.save();

    return res.status(200).json({
      success: true,
      false: `Ticket assigned successfully to ${agent}`,
      ticket
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

export { createTicket, updateTicket, getAllTicket, getOneTicket, deleteTicket, assignTicket }
