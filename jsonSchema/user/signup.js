module.exports = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string", required: true },
    username: { type: "string", required: true },
    email: {
      type: "string",
      pattern:
        '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      required: true,
    },
    password: { type: "string", required: true },
    isGoogleAuth: { type: "boolean" },
  },
};
