"use strict";

const express = require("express");

const router = express.Router();
const { postLogin, postSignUp } = require("../controller/authController");

router.post("/login", postLogin);
router.post("/signup", postSignUp);

module.exports = {
    routes: router,
};
