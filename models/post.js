const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  post: {
    type: String,
    trim: true,
    required: true,
  },
  isRetweet: {
    type: Boolean,
    default: false,
    // required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
});

module.exports = mongoose.model("Post", postSchema);
