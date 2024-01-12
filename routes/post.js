const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddleware").process

router.post("/create", protect,require("../controllers/post/createposts").process)
router.get("/", protect,require("../controllers/post/getAllpost").process)
router.get("/get/:id", protect,require("../controllers/post/getpost").process)
router.delete("/delete/:id", protect,require("../controllers/post/deletepost").process)
router.put("/update", protect,require("../controllers/post/updatepost").process)
router.post("/isLike/:id", require("../controllers/post/isLike").process)
router.post("/isRetweet/:id", require("../controllers/post/isRetweet").process)
router.post("/isBookmark/:id", require("../controllers/post/isBookmark").process)
router.post("/createComment", require("../controllers/comments/create").process)
router.get("/comment", require("../controllers/comments/getAllComments").process)
router.get("/comment/:id", require("../controllers/comments/getComment").process)




module.exports = router