import express from "express";
import router from "./routes/ticket.routes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//basic routes
app.get("/", (req, res) => {
  res.send("API is running!");
})

//app routes
app.use("/api/v1/tickets", router)

export default app;
