'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./config.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
    devtool: 'source-map',
    entry: ['./src/index', './css/style.less'],
    output: {
        path: path.join(path.resolve(path.dirname()), config.publicFolder),
        publicPath: '/' + config.publicFolder + '/',
        filename: 'bundle.js'
    },
    plugins: [
        extractCSS,
        new webpack.optimize.DedupePlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js|\.jsx$/,
            loaders: ['babel'],
            exclude: /node_modules/
        },
            { test: /\.less$/, exclude: /node_modules/,  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') }
       ]
    }
};
