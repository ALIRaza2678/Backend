import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ar", {
     
    });
    console.log("DB is connected");
  } catch (error) {
    console.error("DB is not connected:", error.message);
  }
};

export default connectdb;
