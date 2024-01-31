import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConfig } from "./SRC/config/dbConfig.js";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// dbConfig
dbConfig();

// import API routers
import userRouter from "./SRC/router/userRouter.js";

// creating APIS
app.use("/api/v1/user", userRouter);

// listening to the port
app.listen(process.env.PORT, () => {
  console.log(`Your app is listening to ${process.env.PORT}`);
});
