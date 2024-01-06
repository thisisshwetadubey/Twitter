const express = require("express")
const router = express.Router()

router.post("/create", require("../controllers/post/createposts").process)
router.get("/get/:id", require("../controllers/post/getPost").process)
router.delete("/delete/:id", require("../controllers/post/deletepost").process)
router.put("/update", require("../controllers/post/updatepost").process)


module.exports = router