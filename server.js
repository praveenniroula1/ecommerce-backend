import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// apis
import productRouter from "./SRC/routers/productRouter.js"
app.use("/api/v1/product", productRouter);

// dbConfig
import { dbConfig } from "./SRC/dbConfig/dbConfig.js";
dbConfig();

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening to ${process.env.PORT}`);
});
