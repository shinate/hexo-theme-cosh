'use strict';

module.exports = function (gulp, PLUGIN, CONF) {

    gulp.task('css-asset', function () {
        return gulp.src([
            CONF.src + '/css/**/*.min.css'
        ])
            .pipe(PLUGIN.plumber())
            // .pipe(PLUGIN.sourcemaps.init())
            // .pipe(PLUGIN.sourcemaps.write('./'))
            .pipe(gulp.dest(CONF.build + '/css'));
    });

    gulp.task('css-bundle', function () {
        var _T = gulp.src([
            CONF.src + '/css/**/*.css'
        ])
            .pipe(PLUGIN.plumber());

        if (CONF.env !== 'production') {
            _T = _T.pipe(PLUGIN.sourcemaps.init());
            _T = _T.pipe(PLUGIN.sourcemaps.write('./'));
        } else {
            _T = _T.pipe(PLUGIN.cssmin()).pipe(PLUGIN.rename({
                suffix: '.min'
            }))
        }

        _T = _T.pipe(gulp.dest(CONF.build + '/css'));

        return _T;
    });

    gulp.task('css', ['css-asset', 'css-bundle'], function () {
        var _T = gulp.src([
            CONF.src + '/css/bundle/**/*.less'
        ])
            .pipe(PLUGIN.plumber());

        if (CONF.env !== 'production') {
            _T = _T.pipe(PLUGIN.sourcemaps.init())
        }

        _T = _T.pipe(PLUGIN.less());

        if (CONF.env !== 'production') {
            _T = _T.pipe(PLUGIN.sourcemaps.write('./'));
        } else {
            _T = _T.pipe(PLUGIN.cssmin()).pipe(PLUGIN.rename({
                suffix: '.min'
            }))
        }

        _T = _T.pipe(gulp.dest(CONF.build + '/css'));

        return _T;
    });
};