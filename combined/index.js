"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;
const htmlDir = path.join(__dirname, "html");
const staticDir = path.join(__dirname, "static");

app.use(express.static(staticDir));

app.get("/", function (req, res, next) {
    const fileName = "index.html";
    const options = {
        root: htmlDir,
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
});

app.get("/:file", function (req, res, next) {
    const fileName = req.params.file;
    const options = {
        root: htmlDir,
        dotfiles: "deny",
        headers: {
            "x-timestamp": Date.now(),
            "x-sent": true,
        },
    };

    const exists = fs.existsSync(path.join(htmlDir, fileName));
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
});

app.listen(port, () => {
    console.log(`Site is up on port ${port}`);
});
