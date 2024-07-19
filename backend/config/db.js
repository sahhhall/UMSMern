import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected to ${connection.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};


export default connectDB