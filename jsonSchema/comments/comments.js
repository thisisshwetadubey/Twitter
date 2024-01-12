module.exports = {
  type: "Object",
  additionalProperties: false,
  required: true,
  properties: {
    comments: { type: "string", required: true },
    postId: { type: "string", required: true },
  },
};
