'use strict';

module.exports = function (gulp, PLUGIN, CONF) {

    var clean = PLUGIN.clean;

    gulp.task('clean', function () {
        if (CONF.env === 'production') {
            return gulp.src([
                CONF.build + '/*',
                '!' + CONF.build + '/.gitignore',
                CONF.release + '/*'
            ], {
                read: false
            })
                .pipe(clean());
        } else {
            return gulp.src([
                CONF.build + '/*',
                '!' + CONF.build + '/.gitignore'
            ], {
                read: false
            })
                .pipe(clean());
        }
    });
};