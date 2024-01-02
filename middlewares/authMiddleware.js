const jwt = require("jsonwebtoken");
const User = require("../models/user");

class protect {
  async process(req, res, next) {
    let token;

    if (req.cookies.jwt) {
      try {
        token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById({ _id: decoded.userId }).select(
          "-password"
        );
        next();
      } catch (error) {
        res.status(401).json({
          statusCode: "401",
          type: "Error",
          data: "Unauthorized User",
        });
      }
    }
    if (!token) {
      res.status(401).json({
        statusCode: "401",
        type: "error",
        data: "No token, Unauthorized User",
      });
    }
  }
}
module.exports = new protect();
