const express = require("express")
const router = express.Router()

router.post("/isLike/:id", require("../controllers/toggleButton/isLike").process)
router.post("/isRetweet/:id", require("../controllers/toggleButton/isRetweet").process)
router.post("/isBookmark/:id", require("../controllers/toggleButton/isBookmark").process)


module.exports = router
