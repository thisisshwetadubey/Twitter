const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (id) => {
  try {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    throw error;
  }
};

const generateRefreshToken = (id) => {
  try {
    return jwt.sign({ userId: id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });
  } catch (error) {
    throw error;
  }
};

const setToken = async (res, id) => {
  try {
    console.log("token set", id);
    const token = generateToken(id);
    const refreshToken = generateRefreshToken(id);
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      age: 24 * 60 * 60 * 1000,
    };
    const user = await User.findById({ _id: id });
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      options: options,
      refreshToken: user.refreshToken,
      accessToken: token,
    };
  } catch (error) {
    throw "Unable to create token";
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  setToken,
};
