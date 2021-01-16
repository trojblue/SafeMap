`use strict`;
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
    var options = {
        root: path.join(__dirname, "html"),
        dotfiles: "deny",
        headers: {
            "x-timestamp": Date.now(),
            "x-sent": true,
        },
    };

    console.log();
});

app.listen(port, () => {
    console.log(`Site is up on port ${port}`);
});
