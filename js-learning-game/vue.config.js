const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.md$/i,
          use: 'raw-loader',
        }
      ]
    }
  }
}