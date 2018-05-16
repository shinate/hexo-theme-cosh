'use strict';

var yargs = require('yargs').argv;
var conf = require('json-config-reader').read('package.json');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var fs = require('fs');
var C = {};

C.env = conf.env;

if (yargs.hasOwnProperty('env')) {
    C.env = yargs.env;
}

C.root = '.';
C.src = C.root + '/src';
C.dev_build_root = C.root + '/.dev';
C.build = C.dev_build_root + '/source';
C.release = C.root + '/source';

C.webpack = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /\.min.js$/
            }
        ]
    },
    plugins: [],
    output: {
        filename: '[name].js'
    }/*,
     resolve: {
     alias: {
     'zepto': fs.realpathSync(C.src + '/assets/zepto-bridge.js'),
     'THREE': fs.realpathSync(C.src + '/assets/three-bridge.js')
     }
     }*/
};

if (C.env === 'production') {
    C.webpack.plugins.push(new UglifyJsPlugin({
        sourceMap: false
    }));
} else {
    C.webpack.devtool = 'source-map';
}

module.exports = C;

