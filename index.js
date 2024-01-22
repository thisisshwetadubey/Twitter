const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoDb = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_CLIENT_URL
      : process.env.PRODUCTION_ClIENT_URL,
  credentials: true,
};
console.log("🚀 ~ corsOptions:", corsOptions)
app.use(cors(corsOptions));

const errorHandler = require("./middlewares/errorHandler").error;

app.use(cookieParser());
app.use(bodyParser.json());
MongoDb.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// app.use("/", (req, res) => res.send("Twitter application is ready"));

app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/search", require("./routes/search"));
app.use("/api/profile", require("./routes/profile"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
