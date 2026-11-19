import { Ticket } from "../models/Ticket.js";

//create a ticket
const createTicket = async (req, res) => {
  try{
    //get the needed info from the body
    const { title, description, category, priority, status } = req.body;

    //basic validators
    if (!title, !description, !category, !priority, !status ) {
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


export { createTicket }
