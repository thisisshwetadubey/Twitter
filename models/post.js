const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    post: {
      type: String,
      trim: true,
      required: true,
    },
    isRetweet: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: Number,
      default: 0,
    },
    retweet: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    isLike: {
      type: Boolean,
      default: false,
    },
    isBookmark: {
      type: Boolean,
      default: false,
    },
    tags: [{
    type: String,
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
