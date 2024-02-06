import { verifyAccessJwt } from "../helper/jwtHelper.js";
import { findUserByEmail } from "../models/userModels.js";
import { getSession } from "../session/sessionModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const decoded = await verifyAccessJwt(authorization);

      if (decoded === "jwt expired") {
        return res.json(403).json({
          status: "error",
          message: "Jwt Expired",
        });
      }

      if (decoded?.email) {
        const existInDb = await getSession({
          type: "jwt",
          token: authorization,
        });

        if (existInDb?._id) {
          const adminInfo = await findUserByEmail({ email });
          if (adminInfo?._id) {
            req.adminInfo = adminInfo;
            return next();
          }
        }
      }
    }

    res.status(401).json({
      status: "error",
      message: "Authorized",
    });
  } catch (error) {
    console.log(error);
  }
};
