const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { setToken } = require("../../util/setToken");

class refreshToken {
  async process(req, res) {
    try {
      if (!req.cookies.refreshToken) throw "Unauthorized request";

      const decoded = jwt.verify(
        req.cookies.refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );

      const user = await User.findById({ _id: decoded.userId });
      if (!user) throw "Invalid refresh token";

      if (req.cookies.refreshToken !== user.refreshToken)
        throw "Refresh token is expired or used";

      const newRefreshToken = await setToken(res, user._id);
      const { options, accessToken, refreshToken } = newRefreshToken;

      res.cookie("jwt", accessToken, options);
      res.cookie("refreshToken", refreshToken, options);
      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: {
          refreshToken: newRefreshToken,
          message: "Access token refreshed",
        },
      });
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new refreshToken();
