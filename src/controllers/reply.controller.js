import { Ticket } from "../models/Ticket.js";

//create a ticket
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

  }
}

export { createReply }
