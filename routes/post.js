const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddleware").process

router.post("/create", protect,require("../controllers/post/createposts").process)
router.get("/", protect,require("../controllers/post/getAllpost").process)
router.get("/get/:id", protect,require("../controllers/post/getUserPosts").process)
router.delete("/delete/:id", protect,require("../controllers/post/deletepost").process)
router.put("/update", protect,require("../controllers/post/updatepost").process)
router.get("/getPost/:id", protect,require("../controllers/post/getPost").process)
router.post("/isLike/:id", protect,require("../controllers/post/likeOnPost").process)
router.post("/retweet/:id", protect,require("../controllers/post/retweet").process)
router.post("/isBookmark/:id", require("../controllers/post/isBookmark").process)
router.post("/createComment", protect,require("../controllers/comments/create").process)
router.get("/comment", protect,require("../controllers/comments/getAllComments").process)
router.get("/comment/:id", protect,require("../controllers/comments/getComment").process)
router.get("/trending",protect,require("../controllers/search/trending").process)

module.exports = router