const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoDb = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const errorHandler = require("./middlewares/errorHandler").error;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
MongoDb.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// app.use("/", (req, res) => res.send("Twitter application is ready"));

app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"))
app.use("/api/search", require("./routes/search"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
