import express from "express";
import { insertCategory } from "../models/categoryModel.js";
const router = express.Router();
import slugify from "slugify";

router.post("/", async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });
    const result = await insertCategory(req.body);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "Successfully catgeory Added",
        result,
      });
    } else {
      return res.json({
        status: "error",
        message: "Failed to ADD catgeory",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
