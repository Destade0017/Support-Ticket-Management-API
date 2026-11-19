import express from "express";
import router from "./routes/ticket.routes.js";

const app = express();

//app routes
app.use("/api/v1/tickets", router)

export default app;
