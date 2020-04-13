const path = require('path');
const webpack = require('webpack');

let plugins = [];

SERVICE_URL = JSON.stringify('http://localhost:8080');


plugins.push(new webpack.DefinePlugin({ SERVICE_URL }));

module.exports = {
  entry: {
      professional: './src/professional.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins
};