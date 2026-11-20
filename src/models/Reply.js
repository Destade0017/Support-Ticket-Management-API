import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
  ticket: {
    type: Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Reply = mongoose.model("Reply", replySchema);
