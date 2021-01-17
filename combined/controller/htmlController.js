"use strict";

const fs = require("fs");
const path = require("path");

const { HTML_DIR } = require("../config");

const getRoot = async (req, res, next) => {
    try {
        const fileName = "index.html";
        const options = {
            root: HTML_DIR,
            dotfiles: "deny",
            headers: {
                "x-timestamp": Date.now(),
                "x-sent": true,
            },
        };

        res.sendFile(fileName, options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log("served:", fileName);
            }
        });
    } catch (error) {
        res.status(400).send("Internal Error");
        console.error(error.message);
    }
};

const getFile = async (req, res, next) => {
    try {
        const fileName = req.params.file;
        const options = {
            root: HTML_DIR,
            dotfiles: "deny",
            headers: {
                "x-timestamp": Date.now(),
                "x-sent": true,
            },
        };

        const exists = fs.existsSync(path.join(HTML_DIR, fileName));
        if (exists) {
            res.sendFile(fileName, options, function (err) {
                if (err) {
                    next(err);
                } else {
                    console.log("served:", fileName);
                }
            });
        } else {
            res.status(404);
            res.send("File Not Exists");
        }
    } catch (error) {
        res.status(400).send("Internal Error");
        console.error(error.message);
    }
};

module.exports = {
    getRoot,
    getFile,
};
