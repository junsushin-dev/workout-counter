module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "airbnb-typescript",
        "plugin:react/recommended",
        "plugin:jest/all",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "jest",
    ],
    "rules": {
    }
};
