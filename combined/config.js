"use strict";

const path = require("path");
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
    PORT,
    HOST,
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;

assert(PORT, "PORT is mandatory");
assert(HOST, "HOST is mandatory");

const HTML_DIR = path.join(__dirname, "html");
const STATIC_DIR = path.join(__dirname, "static");

const { name, version, description } = require("./package.json");
const TITLE = name;

const SWAGGER_OPTION = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: `${TITLE} Api`,
            version,
            description,
        },
        servers: [
            {
                url: `http://${HOST}:${PORT}/api/v1`,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

module.exports = {
    PORT,
    HOST,
    TITLE,
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
    SWAGGER_OPTION,
};
