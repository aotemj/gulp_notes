const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

// 公共部分
const cssTask = gulp
    .src('./src/css/*.css')
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))

const sassTask = gulp
    .src('./src/css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
    }))
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

const scssHandler = function () {
    return sassTask
}

module.exports.scssHandler = scssHandler


// js 压缩，支持 es新语法（es2020等） start
const jsHandler = function () {
    return gulp
        .src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
}

module.exports.jsHandler = jsHandler
// js 压缩，支持 es新语法（es2020等） end