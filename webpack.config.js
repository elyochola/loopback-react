// //http://egorsmirnov.me/2016/04/11/react-and-es6-part6.html
// 'use strict'
// var path = require('path');
// var webpack = require('webpack');

// var config = {
//     devtool: 'cheap-module-eval-source-map',
//     entry: [
//         path.join(__dirname, 'public/scripts/index.js'),
        
//     ],
//     output: {
//         path: path.join(__dirname, 'public'),
//         filename: 'bundle.js'
        
//     },
//     module: {
//         loaders: [
//             {
//                 loader: "babel-loader",
//                 test: /\.js$/,
//                 loaders: ['babel'],
//                 exclude: /node_modules/,
//                 query: {
//                           plugins: ['transform-runtime'],
//                           presets: ['es2015', 'react'],
//                         }
//             }
//         ]
//     }
   

// };

// module.exports = config;


var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    path.join(__dirname, 'public/scripts/index')
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'public/scripts')
      }
    ]
  }
};