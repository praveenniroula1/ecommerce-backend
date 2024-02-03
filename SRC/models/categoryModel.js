import categorySchema from "../schema/categorySchema.js";

export const insertCategory = (obj) => {
  return categorySchema(obj).save();
};
