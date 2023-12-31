const jwt = require("jsonwebtoken");
const User = require("../models/user");

class protect {
  async process(req, res, next) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({ _id: decoded.id }).select(
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
