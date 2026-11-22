/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".next/",
    "build/",
  ],
};
