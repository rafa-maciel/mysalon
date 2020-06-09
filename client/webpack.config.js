const path = require('path');
const webpack = require('webpack');

let plugins = [];

SERVICE_URL = JSON.stringify('http://localhost:8080');


plugins.push(new webpack.DefinePlugin({ SERVICE_URL }));

module.exports = {
  entry: {
    professional: './src/professional.js',
    customer: './src/customer.js',
    vendor: './src/vendor.js',
    authentication: './src/authentication.js',
    purchase: './src/purchase.js',
    appointment: './src/appointment.js',
    profile: './src/profile.js',
    calendar: './src/calendar.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  externals: {
    schedule: './dist/js-libraries/schedule-template-master/js/main.js'
  },
  plugins
};