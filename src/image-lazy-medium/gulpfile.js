const gulp = require('gulp');
const debug = require('gulp-debug');
const rename = require('gulp-rename');
const imageResize = require('gulp-image-resize');

function resizeImages() {
    // exclude images in "resized" folder
    return gulp.src(['assets/**/*.{jpg,png}', '!assets/resized/**/*'])
        .pipe(debug())
        .pipe(imageResize({
            // if ImageMagick is to be used and not GraphicsMagick
            imageMagick: true,
            width: 20,
            // height: 20
        }))
        .pipe(rename(path => path.basename += '_tiny'))
        .pipe(gulp.dest('assets/resized'));

}

exports.default = resizeImages;
