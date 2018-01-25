var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');

var processors = [

    autoprefixer({browsers: ['last 2 version']})
];

gulp.task('html', function buildHTML() {
    return gulp.src('views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
});
gulp.task('css', function(){
    return gulp.src('views/assets/*.styl')
        .pipe(stylus())
        .pipe(postcss(processors))
        .pipe(gulp.dest('build/assets'))
        .pipe(browserSync.stream())
});
gulp.task('copy', function(){
    return gulp.src([
        'views/assets/img/**/*.{jpg,png,jpeg,svg,gif}'
    ])
        .pipe(gulp.dest('build/assets/img'))
});
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});
var reload = function(done){
    browserSync.reload();
    done();
}

gulp.task('watch', function() {
    gulp.watch('views/*.pug', gulp.series('html', reload));
    gulp.watch('views/assets/*.styl', gulp.series('css'));
});


gulp.task('clean', function() {
    return del('build');
});

gulp.task('build', gulp.parallel('html', 'css', 'copy'));
gulp.task('start', gulp.parallel('watch', 'serve'));

gulp.task('default', gulp.series('clean', 'build', 'start'));