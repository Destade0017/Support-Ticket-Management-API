import mongoose from "mongoose";

const connectDB = async() => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`MONGODB connected successfully, Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Database connection failed", error.message);
    process.exit(1);
  }
}


export default connectDB;
