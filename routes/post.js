const express = require("express")
const router = express.Router()

router.post("/create", require("../controllers/post/createposts").process)

module.exports = router