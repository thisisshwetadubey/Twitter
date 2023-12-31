const express = require("express");
const router = express.Router();

router.post("/signup", require("../controllers/user/signup").process); // Register User
router.post("/verify", require("../controllers/user/verify").process);

module.exports = router;
