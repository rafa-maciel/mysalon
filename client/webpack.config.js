const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let plugins = [];

SERVICE_URL = JSON.stringify('http://167.172.118.241:8080');


plugins.push(new webpack.DefinePlugin({ SERVICE_URL }));
plugins.push(new MiniCssExtractPlugin({
  filename: '[name].css'
}));

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  entry: {
    authentication: './src/authentication.js',
    app: './src/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
      },
      { 
          test: /\.css$/, 
          use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      { 
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
      },
      { 
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      { 
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'file-loader' 
      },
      { 
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
      }
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins
};