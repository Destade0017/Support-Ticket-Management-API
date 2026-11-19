import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import app from "./src/app.js";


dotenv.config();

const PORT = process.env.PORT || 4003;

connectDB()
.then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
})
.catch((error) => {
  console.log("MongoDB connection failed!", error.message);
  process.exit(1);
});
