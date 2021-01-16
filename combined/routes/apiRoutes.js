"use strict";

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("API works");
});

//! this two lines works after firebase is properly configured
//！ const exampleFirebaseRoutes = require("./exampleFirebaseRoutes");
//！ router.use("/", exampleFirebaseRoutes);

module.exports = {
    routes: router,
};
