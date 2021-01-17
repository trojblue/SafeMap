"use strict";

const path = require("path");
const assert = require("assert");
const { Firebase_Auth } = require("./model/authModel");

const HOST = "localhost";
const PORT = 3000;
//! NOTE: DO NOT USE DEVELOPMENT SALT IN PRODUCTION MODE!
const SALT = "5462272e-91b0-4d64-810e-df7bda96ac36";

//TODO Add your firebase credential here.
//! NEVER LEAVE THE CREDENTIAL HERE!!!!!!!!
const FIREBASE_TOKEN = Firebase_Auth.from({
    type: "service_account",
    project_id: "chefetown",
    private_key_id: "7b573a174f0874c4a4759bf0a6aecff73854e86d",
    private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbL01Wrf2HdyNz\nw667F4cNGsUWfCfu0IyWuDWe+7lvtpyI8VyRDaGPMd+Oy/RYqsTZN2JGan+fvl6p\nUvPGUQMo2isOD1qipgAWjmlS6PrYNkMNJCwj/uY4LMcYREfqa+vuvnp+8Ahxb/Es\nlDs+Z3Zc4XGrj71oRZpjVM5YVhmiyupyNerc4U/uGF4YdAPrI77MfJPS26dTtxaH\nVHzEDEUMOe8RpO9mtwumP8OoeMPCwjmb+Of/rY3HxjHlUtrp+51M15ArF7ssxWG1\nmeDrm8Nnui4WHxlKIxG/0r8SImv99yvVVdor3srWGzqWL5/6A8oGXweWtuR0B1w4\nC3YMJovTAgMBAAECggEAFhafwB77oEW43Gc5eiBGW2M5vmjXq2D38g5xVOrARspL\n3x8XuYR6phAcG+tg3fijqtJChJ8h6mrIZl72MyOh4mGOGjYg56g79Qn4AkN5WAWr\n3yyoiB4dfEbC76ad6rlihuZKOPWenDPwRZJQoBrUGksb5fKv30y4YM9AljVjEv0Z\nIrkSQjyk2eK7z7irERPbrb75HxN/XfFsP1q7DL1aidAjhwomwGAlnX+/K5pHUoBL\nWYwcyxrpA++DCgjgOQIGroUy8C36clV89mDp86rZ7anUazVpjr/n5yj7hDUv0UKz\nJp5VVSznLb5bfjpBR2UcfxDPPREJ9d5TMUQe7B4VUQKBgQD+bzKcfi03pjAuX7re\nXtl0x1dKWuOqpNfvLbEfWsx7Ep2KjlerFtScrHzAgg1hlDUJ6SD8PLOxm3sdu0Z9\nong4eI89srYFkfIij/PpFz+SiznkFy2tFKHio0ZzVmoi28BXPE0UeMRMOhz541Rn\n6Frz+eSD172I9IPsPZN7AyjlYwKBgQDciJOsgnIAz0cu3t2DXE5yMTsdZRtNCbKq\n5VDdZxAaAs9U07Sc63AqQ+rzDO+QH2kf49vXjvg6NtrOpM8hdJ83nLj74cIG1jDd\nDAgjVgtPtwJAxOeCQgudWLXSZw6WSlTktdC0qeN1fqY8Va798LxlPv4FO8F7UyjF\noz5G4c2C0QKBgQCgXr5r3SvrE5jy4ewLFYXDEZJ3j2pIuLZST16BAN46BLXAC5A+\niplgV2gaft6oTp5PrN3Znvk0TWgAiXYY4jscfQDsRqRsRl10Y3+9v6WWXKMUnXdw\nzLxs+bUCJcmoRxKo6Z079hLkaQyyhRNCmzYY6b2bTHRuypAMa5N1ybwROQKBgDBD\nt8YOenLQ6mxInEQuhICbY6uoQBRZJgAe1dbOwoheyw9ukd2x7Udiu93bm+Z36WLw\nVGHVyV+8N6D4EtjolBvwsc92didW4zTNeE57e1hD3jtcnKo2WCJkks5sfZXIyNGR\nNQ8FC2HgiPM1cWnkMOcbpS5yCIM8DPVMJ8oNixOxAoGALiGqZJ1FHDRup1qHPCRn\nxcLxwVd5tleAaBG5UksJfA3ingtNI0/sgfO239KNvGfxE+nFnQJetz7fBwnSlPDv\ngQV3fNNd52sc6J1ayjj1AkzQIO3bbTE2khYXYVBPSE7UvMjYXkd9jaiifAJz50Lr\nO0sjEjV2ODdcpZWTUoPs9+8=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-l6wmr@chefetown.iam.gserviceaccount.com",
    client_id: "115330923188517803230",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l6wmr%40chefetown.iam.gserviceaccount.com",
});

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
    SWAGGER_OPTION,
    FIREBASE_TOKEN,
    SALT,
};
