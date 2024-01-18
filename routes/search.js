const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddleware").process



router.get("/trending",protect,require("../controllers/search/trending").process)
