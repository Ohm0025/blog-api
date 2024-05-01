const express = require("express");
const router = express.Router();

const authen = require("../routes/authen.route");
const postRoute = require("../routes/post.route");
const checkUserAuth = require("../middlewares/authenUser");

router.use("/authen", authen);
router.use(checkUserAuth);

router.use("/post", postRoute);

module.exports = router;
