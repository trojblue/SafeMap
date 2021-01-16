"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { PORT, STATIC_DIR } = require("./config");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const app = express();

app.use(express.static(STATIC_DIR));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api route have to go earlier.
app.use("/api", apiRoutes.routes);
app.use("/", htmlRoutes.routes);

app.listen(PORT, () => {
    console.log(`Site is up on port ${PORT}`);
});
