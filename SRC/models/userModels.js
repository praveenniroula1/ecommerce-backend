import userSchema from "../schema/userSchema.js";

// register new user
export const createUser = (obj) => {
  try {
    return userSchema(obj).save();
  } catch (error) {
    console.log(error);
  }
};

export const findUserByEmail = (email) => {
  return userSchema.findOne({ email });
};

export const updateOneUser = (filter, update) => {
  return userSchema.findOneAndUpdate(filter, update, { new: true });
};
