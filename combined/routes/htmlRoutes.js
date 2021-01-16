"use strict";

const express = require("express");

const router = express.Router();
const { getRoot, getFile } = require("../controller/htmlController");

router.get("/", getRoot);
router.get("/:file", getFile);

module.exports = {
    routes: router,
};
