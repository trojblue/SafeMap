"use strict";

module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    root: true,
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        strict: [2, "global"],
        "no-unused-vars": ["warn"],
    },
};
