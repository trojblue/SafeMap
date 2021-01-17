"use strict";

const { LoginModel, SignUpModel } = require("../model/authModel");
const { saltedHash, db } = require("../utils/firebase");
const { tokenCheck } = require("../utils/firebase");

const postLogin = async (req, res, next) => {
    try {
        const logInfo = LoginModel.from(req.body);
        const passwd = saltedHash(logInfo.password);
        const { Token } = req.signedCookies;
        const { User } = req.cookies;
        if (Token && User && (await tokenCheck(Token, User)) && User == logInfo.email) {
            res.redirect("login_already");
            res.end();
            return;
        }
        const users = db.collection("user");
        const query = await users
            .where("name", "==", logInfo.email)
            .where("password", "==", passwd) //! password validation is done here
            .get()
            .then((resp) => {
                var data = [];
                if (resp.empty) {
                    return data;
                }
                resp.forEach((doc) => {
                    data.push({ id: doc.id, data: doc.data() });
                });
                return data;
            })
            .catch((err) => {
                console.log("error with database", err);
            });
        if (query.length != 0) {
            const record = query[0];
            const id = record.id;
            console.log(`User ${logInfo.email} with doc id ${id} logged in successfully`);
            res.cookie("Token", id, { signed: true });
            res.cookie("User", logInfo.email);
            res.redirect("/login_success");
            res.end();
        } else {
            res.redirect("/login_fail");
            res.end();
        }
    } catch (error) {
        res.status(400).send("Invalid Request");
        console.log(error);
    }
};

const postSignUp = async (req, res, next) => {
    try {
        const regInfo = SignUpModel.from(req.body);
        if (regInfo.password[0] == regInfo.password[1]) {
            // query for if this email is already used
            const users = db.collection("user");
            const query = await users
                .where("name", "==", regInfo.email)
                .get()
                .then((resp) => {
                    var data = [];
                    if (resp.empty) {
                        return data;
                    }
                    resp.forEach((doc) => {
                        data.push({ id: doc.id, data: doc.data() });
                    });
                    return data;
                })
                .catch((err) => {
                    console.log("error with database", err);
                });
            //if not
            if (query.length == 0) {
                const passwd = saltedHash(regInfo.password[0]);
                const userInfo = {
                    name: regInfo.email,
                    password: passwd,
                    favorite_location: [],
                };
                const record = await db.collection("user").add(userInfo);
                if (record.id) {
                    res.cookie("Token", record.id, { signed: true });
                    res.cookie("User", regInfo.email);
                    res.redirect("/signup_success");
                    res.end();
                }
            } else {
                res.redirect("/signup_already");
                res.end();
            }
        } else {
            res.redirect("/signup_invalid_passwd");
            res.end();
        }
    } catch (error) {
        res.status(400).send("Invalid Request");
        console.log(error);
    }
};

module.exports = {
    postLogin,
    postSignUp,
};
