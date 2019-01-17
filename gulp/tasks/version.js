'use strict';

var fs = require('fs')
var md5 = require('md5')

module.exports = function (gulp, PLUGIN, CONF) {

    gulp.task('version', function (cb) {
        fs.writeFileSync('./.version', md5('' + (+new Date)))
        cb()
    });
};