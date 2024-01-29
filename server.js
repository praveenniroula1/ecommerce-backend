import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// listening to the port
app.listen(process.env.PORT, () => {
  console.log(`Your app is listening to ${process.env.PORT}`);
});
