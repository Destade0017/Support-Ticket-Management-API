import express from "express";
import ticketRouter from "./routes/ticket.routes.js";
import replyRouter from "./routes/reply.routes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//basic routes
app.get("/", (req, res) => {
  res.send("API is running!");
})

//app routes
app.use("/api/v1/tickets", ticketRouter)
app.use("/api/v1/tickets", replyRouter)

export default app;
