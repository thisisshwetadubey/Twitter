class errorHandler {
  async error(err, req, res, next) {
    try {
      const statusCode = res.statusCode ? res.statusCode : 500;
      res.status(statusCode);
      res.json({
        message: err.message,
        stack: process.env.NODE_ENV == "production" ? null : err.stack,
      });
    } catch (error) {
      console.log("Unable to handle error", error);
    }
  }
}
module.exports = new errorHandler();
