import mongoose from "mongoose";

export const dbConfig = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    const connection = mongoose.connect(conStr);
    if (connection) {
      connection && console.log("MongoDB successfully Connected");
    }
  } catch (error) {
    console.log(error);
  }
};
