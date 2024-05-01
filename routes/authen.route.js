const express = require("express");
const router = express.Router();

const { userRegister, userLogin } = require("../controllers/authen.controller");

router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
