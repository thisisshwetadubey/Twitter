const express = require("express");
const router = express.Router();

router.post("/signup", require("../controllers/user/signup").process);
router.post("/verify", require("../controllers/user/verify").process);
router.post("/login", require("../controllers/user/login").process);
router.post("/logout", require("../controllers/user/logout").process);





module.exports = router;
