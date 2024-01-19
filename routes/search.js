const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddleware").process



router.get("/trending",protect,require("../controllers/search/trending").process)
router.get("/trendingNews", protect, require("../controllers/search/newsTrending").process)
router.get("/trendingSports", protect, require("../controllers/search/sportsEntertainment").process)


module.exports = router
