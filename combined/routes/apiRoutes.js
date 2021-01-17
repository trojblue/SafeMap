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
/**
 * @swagger
 * tags:
 *   name: UserInfo
 *   description: API for Get User Info
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: Token
 *     cookieName:
 *       type: apiKey
 *       in: cookie
 *       name: User
 */

/**
 * @swagger
 * /username:
 *   get:
 *     description: Get the user name of current signed in user
 *     tags:
 *       - UserInfo
 *     security:
 *       - cookieAuth: []
 *       - cookieName: []
 *     responses:
 *       "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: number
 *                    oneOf:
 *                      - 0: Success
 *                      - 100: Not Logged In
 *                      - 101: Server Internal Error
 *                  data:
 *                    type: string
 *                    oneOf:
 *                      - User's email: if success
 *                      - error info: if request failed
 *                    example: "abc@abc.abc"
 */
router.get("/username", getUsername);

const { addLocation, getLocations } = require("../controller/locationController");

/**
 * @swagger
 * /location:
 *   get:
 *     description: Get the list of user favorite locations.
 *     tags:
 *       - UserInfo
 *     security:
 *       - cookieAuth: []
 *       - cookieName: []
 *     responses:
 *       "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: number
 *                    oneOf:
 *                      - 0: Success
 *                      - 100: Not Logged In
 *                  data:
 *                    type: list
 *                    example:
 *                      [
 *                          {
 *                              longitude: 123,
 *                              latitude: 456,
 *                              name: "fake"
 *                          }
 *                      ]
 */
router.get("/location", getLocations);
/**
 * @swagger
 * /location:
 *   put:
 *     description: Add 1 location to user's favorite
 *     tags:
 *       - UserInfo
 *     security:
 *       - cookieAuth: []
 *       - cookieName: []
 *     responses:
 *       "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: number
 *                    oneOf:
 *                      - 0: Success
 *                      - 100: Not Logged In
 */
router.put("/location", addLocation);

module.exports = {
    routes: router,
};
