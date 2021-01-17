"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsonDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");

const { PORT, STATIC_DIR, SWAGGER_OPTION, SALT } = require("./config");
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const { serveMap } = require("./controller/mapController");
const { isLogin } = require("./utils/firebase");
const app = express();
const htmlDir = "./html";

//adding middleware
//! Notice, all the file under static folder are auto served by the next line
app.use(express.static(STATIC_DIR));
app.use(cookieParser(SALT));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setting up swagger
const specs = swaggerJsonDoc(SWAGGER_OPTION);

//register all the routers
app.use("/swagger", swaggerUI.serve);
app.get("/swagger", swaggerUI.setup(specs));
app.use("/api/v1", apiRoutes.routes);
app.use("/", authRoutes.routes);
app.get("/map", isLogin, serveMap);
//* / route have to be the last one here.
app.use(express.static(htmlDir, { extensions: ["html"] }));

//everything are shiny and ready, launch!
app.listen(PORT, () => {
    console.log(`Site is up on port ${PORT}`);
});
