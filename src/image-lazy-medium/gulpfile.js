const gulp = require('gulp');
const debug = require('gulp-debug');
const rename = require('gulp-rename');
const imageResize = require('gulp-image-resize');

/**
 *
 * @param {Number|Boolean} width
 */
function resizeImages(width) {
    return () => {
        let suffix = `_${width}`;
        if (width === true) {
            width = 20;
            suffix = '_tiny';
        }

        // exclude images in "resized" folder
        return gulp.src(['assets/**/*.{jpg,png}', '!assets/resized/**/*'])
            .pipe(debug())
            .pipe(imageResize({
            // if ImageMagick is to be used and not GraphicsMagick
                imageMagick: true,
                width,
            // height: 20
            }))
            .pipe(rename(path => path.basename += suffix))
            .pipe(gulp.dest('assets/resized'));
    };
}

exports.default = gulp.parallel([true, 200, 400, 800].map(width => resizeImages(width)));
