const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware").process;

router.post("/signup", require("../controllers/user/signup").process);
router.post("/verify", require("../controllers/user/verify").process);
router.post("/login", protect, require("../controllers/user/login").process);

module.exports = router;
