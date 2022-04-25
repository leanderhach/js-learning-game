module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["plugin:vue/vue3-recommended"],
  plugins: ["vue", "import"]
};