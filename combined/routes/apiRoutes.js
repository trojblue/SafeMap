"use strict";

const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Testing
 *   description: API for testing use.
 */

/**
 * @swagger
 * /testing:
 *   get:
 *     description: Greeting message from API
 *     tags:
 *       - Testing
 *     responses:
 *       "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  text:
 *                    type: string
 *                    example: API works
 */
router.get("/testing", function (req, res) {
    res.send({ text: "API works" });
});

const { getUsername } = require("../controller/userInfoController");
router.get("/username", getUsername);

//! this two lines works after firebase is properly configured
//！ const exampleFirebaseRoutes = require("./exampleFirebaseRoutes");
//！ router.use("/", exampleFirebaseRoutes);

module.exports = {
    routes: router,
};
