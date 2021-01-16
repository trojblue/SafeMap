"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { PORT, STATIC_DIR } = require("./consts");
const htmlRoutes = require("./routes/html-routes");

const app = express();

app.use(express.static(STATIC_DIR));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", htmlRoutes.routes);

app.listen(PORT, () => {
    console.log(`Site is up on port ${PORT}`);
});
