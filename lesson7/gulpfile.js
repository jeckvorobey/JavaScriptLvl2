let gulp = require('gulp'),
    scss = require('gulp-sass'),
    minifyJs = require('gulp-terser'), //минификация js
    autoprefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync'), //сервер
    htmlMin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    delFiles = require('del'),
    cssMiniFy = require('gulp-csso'),
    babel = require('gulp-babel'),
    pug = require('gulp-pug');
    imagemin = require('gulp-imagemin');

gulp.task('clean', () => {
    return delFiles('dist');
});

gulp.task('pug', () => {
    return gulp
        .src('app/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'));
});

gulp.task('scss', () => {
    return gulp
        .src('app/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(cssMiniFy())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
    return gulp
        .src('app/js/*.js')
        .pipe(minifyJs())
        .pipe(
            rename({
                suffix: '.min'
            })
        )
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compress', () => {
    return gulp
        .src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images/'));
})

gulp.task('copyFiles', () => {
    return gulp
        .src('app/json/*.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
    return bs({
        server: {
            baseDir: 'dist'
        },
        browser: 'browser'
    });
});

gulp.task('scss:watch', () => {
    return gulp.watch(
        'app/scss/**/*.scss',
        gulp.series('scss', done => {
            bs.reload();
            done();
        })
    );
});

gulp.task('js:watch', () => {
    return gulp.watch(
        'app/js/**/*.js',
        gulp.series('js', done => {
            bs.reload();
            done();
        })
    );
});

gulp.task('pug:watch', () => {
    return gulp.watch(
        'app/pug/**/*.pug',
        gulp.series('pug', done => {
            bs.reload();
            done();
        })
    );
});

gulp.task('compress:watch', () => {
    return gulp.watch(
        'app/images/*.*',
        gulp.series('compress', done => {
            bs.reload();
            done();
        })
    );
});

// по умолчанию запускает все функции
gulp.task(
    'default',
    gulp.series(
        'clean',
        gulp.parallel('pug', 'scss', 'js', 'compress', 'copyFiles'),
        gulp.parallel('scss:watch', 'js:watch', 'pug:watch', 'compress:watch', 'server')
    )
);