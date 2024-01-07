const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddleware").process

router.post("/create", protect,require("../controllers/post/createposts").process)
router.get("/get/:id", protect,require("../controllers/post/getPost").process)
router.delete("/delete/:id", protect,require("../controllers/post/deletepost").process)
router.put("/update", protect,require("../controllers/post/updatepost").process)


module.exports = router