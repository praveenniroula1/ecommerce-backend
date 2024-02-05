import categorySchema from "../schema/categorySchema.js";

export const insertCategory = (obj) => {
  return categorySchema(obj).save();
};

export const getAllCategory = () => {
  return categorySchema.find();
};

export const getCategoryById = (_id) => {
  return categorySchema.findById(_id);
};

export const updateCategoryById = ({ _id, ...update }) => {
  return categorySchema.findByIdAndUpdate(_id, update, { new: true });
};

export const hasChildCategoryById = async (parentId) => {
  const cat = await categorySchema.findOne({ parentId });
  return cat?._id ? true : false;
};

//get a categor
export const deleteCategoryById = (_id) => {
  return categorySchema.findByIdAndDelete(_id);
};
