var express = require('express');
var path = require('path');
var webpack = require('webpack');
var config = require('./config.json');
var app = express();

var isDevelopment = (process.env.NODE_ENV !== 'production');
var static_path = path.join(path.resolve(path.dirname()), config.publicFolder);

var prodListener = app.use(express.static(static_path))
    .get('/', function (req, res) {
        res.sendFile('index.html', {
            root: static_path
        });
    }).listen(process.env.PORT || config.prodPort, function (err) {
        if (err) { console.log(err); }
        console.log('Production is listening at localhost:' + prodListener.address().port);
    });

if (isDevelopment) {
    var webpackDevConf = require('./webpack.config.dev');
    var WebpackDevServer = require('webpack-dev-server');

    new WebpackDevServer(webpack(webpackDevConf), {
        publicPath: webpackDevConf.output.publicPath,
        hot: true,
        stats: { colors: true }
    }).listen(config.devPort, 'localhost', function (err) {
        if (err) { console.log(err); }
        console.log('Development is listening at localhost:' + config.devPort);
    });
}
