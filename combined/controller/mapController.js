"use strict";

const { HTML_DIR } = require("../config");

const serveMap = async function (req, res) {
    const fileName = "map.html";
    const options = {
        root: HTML_DIR,
        dotfiles: "deny",
        headers: {
            "x-timestamp": Date.now(),
            "x-sent": true,
        },
    };

    res.sendFile(fileName, options);
};

module.exports = {
    serveMap,
};
