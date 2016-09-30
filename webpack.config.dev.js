//http://egorsmirnov.me/2016/04/11/react-and-es6-part6.html
'use strict'
var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        path.join(__dirname, 'public/scripts/index.js'),
        
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
        
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                query: {
                          plugins: ['transform-runtime'],
                          presets: ['es2015', 'react'],
                        }
            }
        ]
    }
   

};

module.exports = config;


