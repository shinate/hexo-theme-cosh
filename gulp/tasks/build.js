'use strict';

var execa = require('execa').shellSync;

module.exports = function (gulp, PLUGIN, CONF) {
    gulp.task('build', ['css', 'js', 'fonts', 'images'], function (cb) {
        if (CONF.env !== 'production') {
            execa([
                'cp -R',
                CONF.root + '/lang',
                CONF.root + '/layout',
                CONF.root + '/scripts',
                CONF.root + '/_config.yml',
                CONF.root + '/package.json',
                CONF.dev_build_root
            ].join(' '));
        }

        cb();
    });
};