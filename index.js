const express = require("express");
const app = express();
const MongoDb = require("./config/db");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
dotenv.config();
MongoDb.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", (req, res) => res.send("Twitter application is ready"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
