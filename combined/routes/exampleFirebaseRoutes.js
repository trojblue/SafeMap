"use strict";

const express = require("express");

const router = express.Router();
const { addExample } = require("../controller/exampleFirebaseController");

router.post("/example", addExample);

module.exports = {
    routes: router,
};
