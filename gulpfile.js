var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    require('dotenv').load();
}
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    path = require('path'),
    imagemin = require('gulp-imagemin'),
    source = require('vinyl-source-stream'),
    reporter = require('gulp-codeclimate-reporter'),
    nodemon = require('gulp-nodemon'),
    bower = require('gulp-bower'),
    jasmineTest = require('gulp-jasmine'),
    karma = require('gulp-karma'),


    browserify = require('browserify'),
    paths = {
        public: 'public/**',
        jade: ['!app/shared/**', 'app/**/*.jade'],
        scripts: 'app/**/*.js',
        images: 'app/images/**/*',
        staticFiles: [
            '!app/**/*.+(less|css|js|jade)',
            '!app/images/**/*',
            'app/**/*.*'
        ],
        unitTests: [],
        serverTests: 'tests/server/src/*.js',
        styles: 'app/styles/*.+(less|css)'
    };

gulp.task('codeclimate-reporter', ['test:fend'], function() {
    return gulp.src(['coverage/lcov/lcov.info'], {
            read: false
        })
        .pipe(reporter({
            token: process.env.CODECLIMATE_REPO_TOKEN,
            verbose: true
        }));
});

gulp.task('codeclimate-reporter', ['test:fend', 'test:bend'], function() {
    return gulp.src(['coverage/lcov/lcov.info'], {
            read: false
        })
        .pipe(reporter({
            token: process.env.CODECLIMATE_REPO_TOKEN,
            verbose: true
        }));
});

gulp.task('jade', function() {
    gulp.src(paths.jade)
        .pipe(jade())
        .pipe(gulp.dest('./public/'));
});

gulp.task('less', function() {
    gulp.src(paths.styles)
        .pipe(less({
            paths: [path.join(__dirname, './app/styles')]
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function() {
    gulp.src(paths.images)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./public/images/'));
});

gulp.task('test:fend', ['test:bend'], function() {
    // Be sure to return the stream
    return gulp.src(paths.unitTests)
        .pipe(karma({
            configFile: __dirname + '/karma.conf.js',
            // autoWatch: false,
            // singleRun: true
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('public/lib/'));
});

gulp.task('nodemon', function() {
    nodemon({
            script: 'index.js',
            ext: 'js',
            ignore: ['public/', 'node_modules/']
        })
        .on('change', ['lint'])
        .on('restart', function() {
            console.log('>> node restart');
        });
});

gulp.task('test:bend', function() {
    return gulp.src(paths.serverTests)
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmineTest({
            verbose: true
        }));
});

gulp.task('images', function() {
    gulp.src(paths.images)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./public/images/'));
});

gulp.task('static-files', function() {
    return gulp.src(paths.staticFiles)
        .pipe(gulp.dest('public/'));
});


gulp.task('browserify', function() {
    return browserify('./app/scripts/application.js').bundle()
        .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
        .on('error', gutil.log.bind(gutil, 'Browserify ' +
            'Error: in browserify gulp task'))
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('application.js')) // Desired filename
        // Output the file
        .pipe(gulp.dest('./public/js/'));
});


gulp.task('watch', function() {
    // livereload.listen({ port: 35729 });
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.styles, ['less']);
    gulp.watch(paths.scripts, ['browserify']);
    // gulp.watch(paths.public).on('change', livereload.changed);
});

gulp.task('build', ['jade', 'less', 'static-files',
    'images', 'browserify', 'bower'
]);
gulp.task('heroku:production', ['build']);
gulp.task('heroku:staging', ['build']);
gulp.task('production', ['nodemon', 'build']);
gulp.task('test', ['test:fend', 'test:bend', 'codeclimate-reporter']);
gulp.task('default', ['nodemon', 'watch', 'build']);
