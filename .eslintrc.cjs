module.exports = {
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    // eslint-config-prettier disables all style-based eslint rules
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  root: true,
};
