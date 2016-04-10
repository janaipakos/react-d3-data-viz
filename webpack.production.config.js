var path = require('path');
var webpack = require('webpack');
var config = require('./config.json');

module.exports = {
    devtool: 'source-map',
    entry: './src/index',
    output: {
        path: path.join(path.resolve(path.dirname()), config.publicFolder),
        publicPath: '/' + config.publicFolder + '/',
        filename: 'bundle.js'
    },
    plugins: [
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
            { test: /\.less$/, exclude: /node_modules/, loaders: ['style', 'css', 'less'] }
        ]
    }
};
