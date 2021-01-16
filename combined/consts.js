"use strict";

const path = require("path");
require("dotenv").config();

const PORT = process.env.SERVER_PORT;
const HTML_DIR = path.join(__dirname, "html");
const STATIC_DIR = path.join(__dirname, "static");

module.exports = {
    PORT,
    HTML_DIR,
    STATIC_DIR,
};
