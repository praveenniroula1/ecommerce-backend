export const adminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const isVerified = true;
    if (isVerified) {
      return next();
    }
    res.status(401).json({
      status: "error",
      message: "Authorized",
    });
  } catch (error) {
    console.log(error);
  }
};
