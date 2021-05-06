const gulp = require('gulp');
const cssmin = require('gulp-cssmin');

// 公共部分
const cssTask = gulp
    .src('./src/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))

// 创建一个打包 CSS 任务 （gulp3.* 写法） start
// gulp.task('cssHandler', function () {
//     return cssTask
// })
// 创建一个打包 CSS 任务 （gulp3.* 写法） end


// 创建一个打包 CSS 任务 （gulp4.* 写法） start
const cssHandler = function () {
    return cssTask
}

module.exports.cssHandler = cssHandler
// 创建一个打包 CSS 任务 （gulp4.* 写法） end