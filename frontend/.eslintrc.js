module.exports = {
  "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "function-paren-newline": ["error", "consistent"],
      "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }],
      "react/forbid-prop-types": [false],
    },
};