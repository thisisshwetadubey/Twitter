const User = require("../../models/user");
const validation = require("../../util/validate");
const jsonSchema = require("../../jsonSchema/user/login");
const bcrypt = require("bcryptjs");
const { setToken } = require("../../util/setToken");

class loginUser {
  async process(req, res) {
    try {
      validation(req.body, jsonSchema);
      const instance = new loginUser();

      const email = req.body.email.toLowerCase();

      const userRegistered = await User.findOne({ email });

      if (userRegistered) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          userRegistered.password
        );
        if (!validPassword) throw "Wrong password!";
        const data = {
          _id: userRegistered._id,
          name: userRegistered.name,
          username: userRegistered.username,
          email: userRegistered.email,
          color: userRegistered.color,
        };

        const token = await setToken(res, data._id);
        const { refreshToken, accessToken, options } = token;
        res
          .status(200)
          .cookie("jwt", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({ statusCode: 200, type: "Success", data: data });
      }
      if (!userRegistered) throw "Sorry, we could not find your account";
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new loginUser();
