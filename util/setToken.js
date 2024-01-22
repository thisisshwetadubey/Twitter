const jwt = require("jsonwebtoken");

module.exports = (res, id) => {
  try {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      age: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    throw "Unable to create token";
  }
};
