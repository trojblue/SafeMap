"use strict";

const firebase = require("firebase");
const config = require("../config");

const db = firebase.initializeApp(config.FIREBASE_CONFIG);

module.exports = db;
