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

const db = Firebase.firestore();

async function tokenCheck(token, email) {
    try {
        const id = token;
        const users = db.collection("user").doc(id);
        const query = await users
            .get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.data().name == email) {
                        return true;
                    }
                }
                return false;
            })
            .catch((err) => {
                console.log("error with database", err);
            });
        return query;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function isLogin(req, res, next) {
    const { Token } = req.signedCookies;
    const { User } = req.cookies;
    if (Token && User && (await tokenCheck(Token, User))) {
        next();
    } else {
        res.redirect("/login");
        res.end();
    }
}

module.exports = {
    Firebase,
    db,
    saltedHash,
    tokenCheck,
    isLogin,
};
