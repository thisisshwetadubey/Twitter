const User = require("../../models/user");
const validation = require("../../util/validate");
const jsonSchema = require("../../jsonSchema/user/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class loginUser {
  async token(id) {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  async process(req, res) {
    try {
      validation(req.body, jsonSchema);
      const instance = new loginUser();

      const { email, password } = req.body;
      const userRegistered = await User.findOne({ email });
      const token = await instance.token(userRegistered._id);

      if (!userRegistered) throw "Sorry, we could not find your account";

      const validPassword = await bcrypt.compare(
        password,
        userRegistered.password
      );

      if (!validPassword) throw "Wrong password!";

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: token,
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

module.exports = new loginUser();
