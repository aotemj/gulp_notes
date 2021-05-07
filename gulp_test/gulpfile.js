const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const webServer = require("gulp-webserver")


// 创建一个打包 CSS 任务 （gulp3.* 写法） start
// gulp.task('cssHandler', function () {
//     return cssTask
// })
// 创建一个打包 CSS 任务 （gulp3.* 写法） end

// 创建一个打包 CSS 任务 （gulp4.* 写法） start
const cssHandler = function () {
    return gulp
        .src('./src/css/*.css')
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
}

module.exports.cssHandler = cssHandler
// 创建一个打包 CSS 任务 （gulp4.* 写法） end

const scssHandler = function () {
    return gulp
        .src('./src/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
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


// html 压缩 start
const htmlHandler = function () {
    return gulp
        .src('./src/pages/*.html')
        .pipe(htmlmin({
            // collapseWhitespace: true // 移除空格
            removeEmptyAttributes: true, // 移除空属性（只限于原生属性）
            collapseBooleanAttributes: true, // 移除 checked 类似的布尔值属性
            removeAttributeQuotes: true, // 移除属性上的双引号
            minifyCss: true, // 压缩内嵌式css 代码（只能基本压缩，不能自动添加前缀 ）
            minifyJS: true, // 压缩内嵌式JS 代码（只能基本压缩，不能进行转码）
            removeStyleLinkTypeAttributes: true, // 移除 style 和link  标签上的type
            removeScriptTypeAttributes: true // 移除script 标签上默认的type 属性
        }))
        .pipe(gulp.dest('./dist/html'))
}

module.exports.htmlHandler = htmlHandler
// html 压缩 end

// 删除打包文件 start
const delHandler = function () {
    return del(['dist'])
}

module.exports.delHandler = delHandler
// 删除打包文件 end

// 创建一个 启动服务器的任务 start
const webHandler = function () {
    return gulp
        .src('./dist')
        .pipe(webServer({
            port: 8080, // 服务端口
            host: 'localhost', // 服务域名
            livereload: true, // 热加载
            open: 'html/index.html', //  默认打开页面
            // 代理（可以设置多个代理）
            proxies: [
                {
                    source: '/gx',
                    target: 'https://www.duitang.com/napi/blog/list/by_filter_id/'
                }
            ]
        }))
}
module.exports.webHandler = webHandler
// 创建一个 启动服务器的任务 end

// 监控变更
const watchHandler = function () {
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/css/*.scss', scssHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
}


// 配置默认任务，执行所有打包任务 start
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,
        scssHandler,
        htmlHandler,
        jsHandler
    ),
    webHandler,
    watchHandler
)
// 配置默认任务，执行所有打包任务 end


