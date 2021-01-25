const { watch } = require('gulp');
const gulp = require('gulp'),
    concat = require('gulp-concat'),
    prfix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

//html task
gulp.task('html', () => {
        //call fills
        return gulp.src('./project/html/*.pug')
            .pipe(pug({ pretty: true }))
            .pipe(gulp.dest('dist/html'))
    })
    // css task
gulp.task('css', () => {
        //call fills
        return gulp.src('./project/css/main.scss')
            //init source map
            .pipe(sourcemaps.init())
            // support old verstion of broser
            .pipe(prfix('last 2 version'))
            //compress scss 
            .pipe(sass({ outputStyle: 'compressed' }))
            // concat scss to main css
            .pipe(concat('main.css'))
            //make source map
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/style'))
    })
    // js task
gulp.task('js', () => {
    return gulp.src([

            'project/**/*.js',

        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
})

// watch task
gulp.task('watch', function() {
    gulp.watch('./project/html/**/*.pug', gulp.series('html'))
    gulp.watch('./project/css/**/*.scss', gulp.series('css'))
    gulp.watch('./project/js/**/*.js', gulp.series('js'))
});
//defult task
gulp.task('default', gulp.series('watch'));