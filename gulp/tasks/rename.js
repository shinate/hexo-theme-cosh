'use strict';

module.exports = function (gulp, PLUGIN, CONF) {
    gulp.task('rename', function () {
        gulp.src([CONF.root + '/source/_posts/*.md']).pipe(PLUGIN.rename(function (file) {
            if (/^\d{4}\-\d{2}\-\d{2}\-/.test(file.basename)) {
                file.basename = file.basename.slice(11);
            }
        })).pipe(gulp.dest(CONF.root + '/source/_posts_copy/'))
    });
};