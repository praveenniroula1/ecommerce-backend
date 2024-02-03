import jwt from "jsonwebtoken";
import { insertSession } from "../session/sessionModel.js";
import { updateOneUser } from "../models/userModels.js";

export const generateAccessToken = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const obj = {
    token: accessToken,
    type: "jwt",
  };
  await insertSession(obj);
  return accessToken;
};

export const generateRefreshToken = async (payload) => {
  const refreshJwt = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  await updateOneUser(payload, { refreshJwt });

  return refreshJwt;
};

export const createJwts = async (payload) => {
  return {
    accessJwt: await generateAccessToken(payload),
    refreshJwt: await generateRefreshToken(payload),
  };
};
