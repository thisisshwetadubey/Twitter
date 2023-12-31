const express = require("express")
const router = express.Router()

router.post("/signup",require("../controllers/user/signup").process); // Register User

module.exports = router;