module.exports = {
  "env": {
    "es6": true,
    "node": true,
  },
  "extends": "eslint:recommended",
  "plugins": ["node"],
  "rules": {
    "indent": [
      "error",
      2,
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "quotes": [
      "error",
      "single",
    ],
    "semi": [
      "error",
      "always",
    ],
    "node/exports-style": [
      "error",
      "module.exports",
    ],
    "node/no-deprecated-api": "error",
    // "node/no-missing-import": "error",
    "node/no-missing-require": "error",
    "node/no-unpublished-bin": "error",
    // "node/no-unpublished-import": "error",
    "node/no-unpublished-require": "error",
    "node/no-unsupported-features": "error",
    "node/process-exit-as-throw": "error",
  }
};
