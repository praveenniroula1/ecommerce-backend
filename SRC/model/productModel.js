import productSchema from "../schema/productSchema.js";

// create product
export const createProduct = (obj) => {
  return productSchema(obj).save();
};

// get all product
export const getAllProduct = () => {
  return productSchema.find();
};

// get all product
export const updateProduct = (filter, update) => {
  return productSchema.findByIdAndUpdate(filter, update, { new: true });
};

// get all product
export const deleteProduct = (id) => {
  return productSchema.findByIdAndDelete(id);
};
