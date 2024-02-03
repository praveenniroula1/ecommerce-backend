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
import { createJwts } from "../helper/jwtHelper.js";

router.post("/register", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = hashPassword(password);
    req.body.password = hashedPassword;
    req.body.emailValidationCode = uuidv4();
    console.log(req.body.emailValidationCode);
    const user = await createUser(req.body);

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
router.post("/login", async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await findUserByEmail(email);

    if (user?._id) {
      if (user?.isVerified !== true) {
        return res.json({
          status: "error",
          message:
            "Your account has not been verified, Pelase check your emai and verify your account.",
        });
      }
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;
        const jwt = await createJwts({ email });
        return res.json({
          status: "success",
          message: "Logged in successfully",
          user,
          ...jwt,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login credintials.",
    });
  } catch (error) {
    next(error);
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
        isVerified: "true",
        emailValidationCode: "",
      }
    );
    if (user?._id) {
      verifiedNotificationEmail(user);
      return res.json({
        status: "success",
        message: "You have been verified, you may login now",
      });
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
