const express = require("express")
const router = express.Router()

router.post("/create", require("../controllers/post/createposts").process)
router.get("/get/:id", require("../controllers/post/getPost").process)
router.delete("/delete/:id", require("../controllers/post/deletepost").process)

module.exports = router