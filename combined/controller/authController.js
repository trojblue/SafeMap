"use strict";

const postLogin = async (req, res, next) => {
    console.log(req.body);
    res.send(req.body);
};

module.exports = {
    postLogin,
};
