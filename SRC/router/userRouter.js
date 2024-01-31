import express from "express";
import {
  createUser,
  findUserByEmail,
  updateOneUser,
} from "../models/userModels.js";
import { comparePassword, hashPassword } from "../helper/bcryptHelper.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import { sendEmail, verifiedNotificationEmail } from "../helper/emailHelper.js";

router.post("/register", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = hashPassword(password);
    req.body.password = hashedPassword;
    req.body.emailValidationCode = uuidv4();
    console.log(req.body.emailValidationCode);
    const user = await createUser(req.body);
    console.log(user);

    if (user?._id) {
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      sendEmail(user, url);
      return res.json({
        status: "success",
        message:
          "Successfully created the user, Please check your email to verify the account.",
        user,
        url,
      });
    } else {
      return res.json({
        status: "error",
        message: "Failed in creating the user",
      });
    }
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "This email has already been used";
    }
    return res.json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (user?._id) {
      console.log(user);
      if (user?.isVerified != "true") {
        return res.json({
          status: "error",
          message: "you are not verified yet",
        });
      }
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;
        return res.json({
          status: "Success",
          message: "Successfully Logged In",
          user,
        });
      }
    } else {
      return res.json({
        status: "error",
        message: "Invalid login Credentials or you are not verified yet",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/verify-email", async (req, res) => {
  try {
    const { emailValidationCode, email } = req.body;
    const user = await updateOneUser(
      {
        email,
        emailValidationCode,
      },
      {
        isVerified: true,
        emailValidationCode: "",
      }
    );
    if (user?._id) {
      return (
        res.json({
          status: "success",
          message: "You have been verified, you may login now",
        }) && verifiedNotificationEmail(user)
      );
    } else {
      return res.json({
        status: "error",
        message: "Invalid or expired link",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
