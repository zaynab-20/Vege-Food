const userModel=require("../models/user")
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
      const auth = req.headers.authorization;
      if (!auth) {
        return res.status(400).json({
          message: "Token not found",
        });
      }
      const token = auth.split(" ")[1];
      if (!token) {
        return res.status(400).json({
          message: "Invalid token",
        });
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      let user;
      user = await userModel.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({
          message: "Authentication Failed: User not found",
        });
      }
      req.user = decodedToken;
  
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({
          message: "Session timed-out: Please login to continue",
        });
      }
      res.status(500).json({
        message: "Internal Server Error" + error.message,
      });
    }
  };
  