'use strict';

module.exports = function (gulp, PLUGIN, CONF) {

    var clean = PLUGIN.clean;

    gulp.task('clean', function () {
        if (CONF.env === 'production') {
            return gulp.src([
                CONF.build + '/*'
            ], {
                read: false
            })
                .pipe(clean());
        } else {
            return gulp.src([
                CONF.dev_build_root + '/*',
                '!' + CONF.dev_build_root + '/.gitignore'
            ], {
                read: false
            })
                .pipe(clean());
        }
    });
};