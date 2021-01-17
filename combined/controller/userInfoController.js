"use strict";

const { tokenCheck } = require("../utils/firebase");

const getUsername = async function (req, res) {
    try {
        const { Token } = req.signedCookies;
        const { User } = req.cookies;
        if (Token && User && (await tokenCheck(Token, User))) {
            res.send({
                code: 0,
                data: User,
            });
            return;
        }
        res.send({
            code: 100,
            data: "Invalid Token or User",
        });
    } catch (error) {
        res.send({
            code: 101,
            data: "Internal Server Issue",
        });
        console.log(error.message);
    }
};

module.exports = {
    getUsername,
};
