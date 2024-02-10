import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Todo",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Todo post method",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
