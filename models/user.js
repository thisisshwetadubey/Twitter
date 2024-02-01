const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    isGoogleAuth: {
      type: Boolean,
    },
    password: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    joinedDate: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
