const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  module: {
    rules: [
      { test: /\.ejs$/i, use: [ { loader: 'ejs-easy-loader' } ] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.ejs',
      filename: './page-a.html',
      title: 'Page A Title',
      meta: {'keywords': 'word1, word2', 'description': 'page description'},
      name: "a"
    }),
    new HtmlWebpackPlugin({
      template: './template.ejs',
      filename: './page-b.html',
      title: 'Page B Title',
      name: "b",
      obj: {"food": "fruit"},
      arr: ["apple", "orange", "banana"]
    })
  ]
};
