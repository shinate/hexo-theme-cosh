'use strict';

var named = require('vinyl-named');
var ws = require('webpack-stream');
var path = require('path');
var colors = require('colors');
var util = require('util');
var fs = require('fs');
var {mo} = require('gettext-parser');
var execa = require('execa');

module.exports = function (gulp, PLUGIN, CONF) {

    gulp.task('watch', ['build', 'script:plugins:watch', 'layout:watch', 'language:watch', 'js:watch', 'css:watch']);

    gulp.task('layout:watch', PLUGIN.intelliWatch([
        CONF.root + '/layout/**/*.ejs'
    ], function (src) {
        return gulp.src(src)
            .pipe(named(function (file) {
                file.base = CONF.root + '/layout';
                var filepath = path.relative(file.base, file.path);
                console.log(filepath.cyan);
                this.queue(file);
            }))
            .pipe(gulp.dest(CONF.root + '/.dev/layout'));
    }));

    gulp.task('script:plugins:watch', PLUGIN.intelliWatch([
        CONF.root + '/scripts/**/*.js'
    ], function (src) {
        return gulp.src(src)
            .pipe(named(function (file) {
                file.base = CONF.root + '/scripts';
                var filepath = path.relative(file.base, file.path);
                console.log(filepath.red);
                this.queue(file);
            }))
            .pipe(gulp.dest(CONF.root + '/.dev/scripts'));
    }));

    gulp.task('language:watch', PLUGIN.intelliWatch([
        './lang/*.mo'
    ], function (src) {
        return new Promise(function (resolve, reject) {
            console.log(execa.shellSync('node language.js').stdout);
            resolve();
        })
    }));

    gulp.task('js:watch', ['build', 'language:watch'], PLUGIN.intelliWatch([
        CONF.src + '/js/bundle/**/*.js',
        '!' + CONF.src + '/js/bundle/**/*.min.js'
    ], function (src) {
        return gulp.src(src)
            .pipe(PLUGIN.plumber())
            .pipe(named(function (file) {
                var p = path.relative(file.base, file.path);
                var prefix = path.relative(CONF.src + '/js/bundle', file.base);
                return (prefix ? prefix + '/' : '') + p.slice(0, -path.extname(p).length);
            }))
            .pipe(ws(CONF.webpack))
            .pipe(gulp.dest(CONF.build + '/js'));
    }));

    gulp.task('css:watch', ['build'], PLUGIN.intelliWatch([
        CONF.src + '/css/bundle/**/*.less'
    ], function (src) {
        return gulp.src(src)
            .pipe(PLUGIN.plumber())
            .pipe(PLUGIN.sourcemaps.init())
            .pipe(PLUGIN.less())
            .pipe(named(function (file) {
                file.base = CONF.src + '/css/bundle/';
                var filepath = path.relative(file.base, file.path);
                console.log('[' + (new Date).toTimeString() + ']', 'LESS Bundle');
                console.log([
                    (new Array(filepath.length - 4)).join(' ') + colors.bold('Asset'),
                    colors.bold('Size')
                ].join(' '));
                console.log([
                    colors.blue.bold(filepath),
                    (parseInt(file.stat.size / 10) / 100) + ' kB'
                ].join(' '));
                this.queue(file);
            }))
            .pipe(PLUGIN.sourcemaps.write('./'))
            .pipe(gulp.dest(CONF.build + '/css'));
    }));
};