import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// apis
import userRouter from "./SRC/routers/userRouter.js";
app.use("/api/v1/user", userRouter);

// dbConfig
import { dbConfig } from "./SRC/dbConfig/dbConfig.js";
dbConfig();

// listening to the port
app.listen(process.env.PORT, () => {
  console.log(`Your app is listening to ${process.env.PORT}`);
});
