var gulp = require('gulp'),
browserSync = require('browser-sync'),
reload = browserSync.reload,
nodemon = require('gulp-nodemon'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
rename = require('gulp-rename'),
browserSync = require('browser-sync'),
concat = require('gulp-concat'),
uglify = require('gulp-uglifyjs');


//compile/minify custom css code
gulp.task('csscustom', function () {
    gulp.src('sass/main.sass')
    .pipe(sass({
    includePaths: require('node-bourbon').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: false
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('public'))
    .pipe(reload({stream: true}));
});

//compile/minify css libraries
gulp.task('csslibs', function(){
    gulp.src([
       // 'app/libs/font-awesome/css/font-awesome.min.css',
        'public/libs/bootstrap/css/bootstrap.min.css',
        'public/libs/bootstrap/css/bootstrap-tagsinput.css',
        'public/libs/bootstrap/css/bootstrap-datepicker.min.css',
        'public/libs/font-awesome/css/font-awesome.min.css',
        'public/libs/hamburgers/hamburgers.min.css'
        ])
    .pipe(concat('libs.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('public'))
    .pipe(reload({stream: true}));
});

//compile/minify js libraries
gulp.task('scripts', function(){
    return gulp.src([
        'public/libs/jquery/jquery.min.js',
        'public/libs/bootstrap/js/bootstrap.min.js',
        'public/libs/bootstrap/js/bootstrap-tagsinput.min.js',
        'public/libs/bootstrap/js/bootstrap-datepicker.min.js',
        'public/libs/bootstrap/js/bootstrap3-typeahead.min.js',
        //maps
        //orig typeahead was after these
        'public/libs/highmaps/highmaps.js',
        'public/libs/highmaps/world-highres.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('nodemon', function (cb) {
    var callbackCalled = false;
    return nodemon({script: 'server.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000", // port of node server
    });
});

gulp.task('watch',['browser-sync','csscustom', 'scripts', 'csslibs'], function() {
    gulp.watch('sass/*.sass', ['csscustom']);
    gulp.watch('public/*.html', reload);
    gulp.watch('public/js/**/*.js', reload);
});

gulp.task('default', ['watch', 'csslibs'], function() {

});
