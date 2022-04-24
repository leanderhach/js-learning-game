module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ["vue", "standard", "plugin:vue/recommended"],
  plugins: ["import", "vue"]
};