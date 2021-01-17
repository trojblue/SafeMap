"use strict";

const { tokenCheck, db } = require("../utils/firebase");

const getAllLocations = async function (id) {
    const users = db.collection("user").doc(id);
    const query = await users
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log(doc.data());
                return doc.data().favorite_location;
            }
            return [];
        })
        .catch((err) => {
            console.log("error with database", err);
        });
    return query;
};

const addLocation = async function (req, res) {
    try {
        const { Token } = req.signedCookies;
        const { User } = req.cookies;
        if (Token && User && (await tokenCheck(Token, User))) {
            //user is logged in
            const locations = await getAllLocations(Token);
            const newLocation = {
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                name: req.body.name,
            };
            locations.push(newLocation);
            const users = db.collection("user").doc(Token);
            const query = await users.update({
                favorite_location: locations,
            });
            res.send({
                code: 0,
            });
        }
    } catch (err) {
        console.log(err);
        res.send({
            code: 100,
        });
    }
};

const getLocations = async function (req, res) {
    try {
        const { Token } = req.signedCookies;
        const { User } = req.cookies;
        if (Token && User && (await tokenCheck(Token, User))) {
            //user is logged in
            const locations = await getAllLocations(Token);
            res.send({
                code: 0,
                data: locations,
            });
        }
    } catch (err) {
        console.log(err);
        res.send({
            code: 100,
        });
    }
};

module.exports = {
    addLocation,
    getLocations,
};
