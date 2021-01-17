"use strict";

const firebase = require("firebase-admin");
const { SALT, FIREBASE_TOKEN } = require("../config");
const crypto = require("crypto");

const Firebase = firebase.initializeApp({
    credential: firebase.credential.cert(FIREBASE_TOKEN),
});

/**
 * Convert the text to salted and hashed version.
 * @param {string} text
 */
const saltedHash = function (text) {
    return crypto.createHmac("sha256", SALT).update(text).digest("base64");
};

const aesEncrypt = function (data, iv) {
    const cipher = crypto.createCipheriv("aes-256-gcm", SALT.substr(0, 32), iv.substr(0, 16));
    const crypted = cipher.update(data);
    return crypted + cipher.final("base64");
};

const aesDecrypt = function (data, iv) {
    const decipher = crypto.createDecipheriv("aes-256-gcm", SALT.substr(0, 32), iv.substr(0, 16));
    const crypted = decipher.update(data);
    return crypted + decipher.final("base64");
};

module.exports = {
    Firebase,
    db: Firebase.firestore(),
    saltedHash,
    aesDecrypt,
    aesEncrypt,
};
