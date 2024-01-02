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

      const email = req.body.email.toLowerCase();

      const userRegistered = await User.findOne({ email });

      if (userRegistered) {
        const token = await instance.token(userRegistered._id);
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
        };

        res.cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          //conditional based on env
          sameSite: "strict",
          age: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          statusCode: 200,
          type: "Success",
          data: data,
        });
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
