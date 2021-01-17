"use strict";

const express = require("express");

const router = express.Router();
const { getRoot, getFile } = require("../controller/htmlController");
const { postLogin } = require("../controller/authController");

router.get("/", getRoot);
router.post("/login", postLogin);
router.get("/:file", getFile);

module.exports = {
    routes: router,
};
