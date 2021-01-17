"use strict";

const firebase = require("../utils/firebase");
const exampleModel = require("../model/exampleFirebaseModel");
const firestore = firebase.firestore();

const addExample = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection("example").doc().set(data);
        res.send("Request Success");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    addExample,
};
