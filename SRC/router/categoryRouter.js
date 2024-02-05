import express from "express";
import {
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  hasChildCategoryById,
  insertCategory,
  updateCategoryById,
} from "../models/categoryModel.js";
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

// get Categories
router.get("/:_id?", async (req, res) => {
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategory();

    res.json({
      status: "success",
      message: "CategoryList",
      categories,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id } = req.body;
    const hasChildCats = await hasChildCategoryById(_id);
    if (hasChildCats) {
      return res.json({
        status: "error",
        message:
          "this one has child category, please delete or reassign to others",
      });
    }
    const categoryUpdate = await updateCategoryById(req.body);
    categoryUpdate?._id
      ? res.json({
          status: "success",
          message: "Successfully updated the category",
        })
      : res.json({
          status: "error",
          message: "Failed to update the category",
        });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const hasChildCats = await hasChildCategoryById(_id);
    if (hasChildCats) {
      return res.json({
        status: "error",
        message:
          "This category has child categories, please delete or reassign them to another category before taking this action.",
      });
    }

    const catDelete = await deleteCategoryById(_id);

    catDelete?._id
      ? res.json({
          status: "success",
          message: "Category has been deleted.",
        })
      : res.json({
          status: "error",
          message: "Unable to delete the category. Please try again later.",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
