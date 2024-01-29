import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConfig } from "./config/dbConfig.js";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// dbConfig
dbConfig();

// listening to the port
app.listen(process.env.PORT, () => {
  console.log(`Your app is listening to ${process.env.PORT}`);
});
