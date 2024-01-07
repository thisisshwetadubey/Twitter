module.exports = {
  type: "object",
  additionalProperties: false,
  required: true,
  properties: {
    post: { type: "string", required: true },
    isRetweet: {
      type: "boolean",
    },
    userId: { type: "string", required: true },
    comment: { type: "number" },
    retweet: { type: "number" },
    like: { type: "number" },
    isLike: { type: "boolean" },
    isBookmark: { type: "boolean" },
  },
};
