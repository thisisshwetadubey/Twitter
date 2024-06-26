const express = require("express")
const router = express.Router()
const protect = require("../middlewares/authMiddleware").process

router.put("/edit", protect, require("../controllers/profile/editProfile").process)
router.get("/usersPosts/:id", protect,require("../controllers/profile/usersPost").process)


module.exports = router