"use strict";

const getUsername = async function (req, res) {
    const { Token, User } = req.cookies;
    console.log(Token);
    console.log(User);
};

module.exports = {
    getUsername,
};
