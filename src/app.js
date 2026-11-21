import express from "express";
import ticketRouter from "./routes/ticket.routes.js";
import replyRouter from "./routes/reply.routes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//basic routes
app.get("/", (req, res) => {
  res.status(200).send("API is running!");
})

//health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "App is healthy and running!",
    timestamps: Date()
  })
})

//app routes
app.use("/api/v1/tickets", ticketRouter)
app.use("/api/v1/tickets", replyRouter)

export default app;
