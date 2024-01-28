import mongoose from "mongoose";

export const dbConfig = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    const connecting = mongoose.connect(conStr);
    if (connecting) {
      console.log(`MongoDb has been successfully connected`);
    }
  } catch (error) {
    console.log(error);
  }
};
