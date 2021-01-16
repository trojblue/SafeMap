"use strict";

const path = require("path");
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
    PORT,
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;

const HTML_DIR = path.join(__dirname, "html");
const STATIC_DIR = path.join(__dirname, "static");

assert(PORT, "PORT is mandatory");

module.exports = {
    PORT,
    HTML_DIR,
    STATIC_DIR,
    FIREBASE_CONFIG: {
        API_KEY,
        AUTH_DOMAIN,
        DATABASE_URL,
        PROJECT_ID,
        STORAGE_BUCKET,
        MESSAGING_SENDER_ID,
        APP_ID,
    },
};
