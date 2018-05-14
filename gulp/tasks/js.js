'use strict';

var ws = require('webpack-stream');
var named = require('vinyl-named');
var path = require('path');

module.exports = function (gulp, PLUGIN, CONF) {

    gulp.task('js-asset', ['js-bundle'], function () {
        return gulp.src([
            CONF.src + '/js/*.min.js'
        ])
            .pipe(PLUGIN.plumber())
            .pipe(gulp.dest(CONF.build + '/js'))
    });

    gulp.task('js-bundle', function () {
        var _T = gulp.src([
            CONF.src + '/js/bundle/**/*.js',
            '!' + CONF.src + '/js/bundle/**/*.min.js'
        ])
            .pipe(PLUGIN.plumber())
            .pipe(named(function (file) {
                var p = path.relative(file.base, file.path);
                return p.slice(0, -path.extname(p).length);
            }))
            .pipe(ws(CONF.webpack));

        if (CONF.env === 'production') {
            _T = _T
            // .pipe(PLUGIN.uglify())
                .pipe(PLUGIN.rename({
                    suffix: '.min'
                }));
        }

        _T = _T.pipe(gulp.dest(CONF.build + '/js'));

        return _T;
    });

    gulp.task('js', ['js-asset', 'js-bundle']);
};