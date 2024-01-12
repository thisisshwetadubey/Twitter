const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddleware").process

router.post("/create", protect,require("../controllers/post/createposts").process)
router.get("/", protect,require("../controllers/post/getAllpost").process)
router.get("/get/:id", protect,require("../controllers/post/getUserPosts").process)
router.delete("/delete/:id", protect,require("../controllers/post/deletepost").process)
router.put("/update", protect,require("../controllers/post/updatepost").process)
router.get("/getPost/:id", protect,require("../controllers/post/getPost").process)


module.exports = router