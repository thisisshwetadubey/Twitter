module.exports = {
  type: "object",
  additionalProperties: false,
  required: true,
  properties: {
    email: { type: "string", required: true },
    password: { type: "string", required: true },
  },
};
