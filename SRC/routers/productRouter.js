import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../model/productModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);

    if (product?._id) {
      res.json({
        status: "success",
        message: "Product has been added successfully",
        product,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// all products
router.get("/all-products", async (req, res) => {
  try {
    const allProduct = await getAllProduct();

    if (allProduct) {
      res.json({
        status: "success",
        message: "All the Product has been Fetched successfully",
        allProduct,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// update products
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const productUpdate = await updateProduct(id, update);
    if (!id) {
      return res.json({
        status: "error",
        message: "Product update Failed",
        productUpdate,
      });
    }

    if (productUpdate) {
      return res.json({
        status: "success",
        message: "Product has been updated successfully",
      });
    } else {
      return res.json({
        status: "error",
        message: "Product updated Failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete  products
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productDelete = await deleteProduct(id);
    if (!id) {
      return res.json({
        status: "error",
        message: "Product Deletion Failed",
      });
    }

    if (productDelete) {
      return res.json({
        status: "success",
        message: "Product has been Deleted successfully",
      });
    } else {
      return res.json({
        status: "error",
        message: "Product Deletation Failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
