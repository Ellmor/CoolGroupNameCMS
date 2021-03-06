var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var jsFiles = ['*.js', 'server/**/*.js'];

gulp.task('style', function () {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('ugly', function(){
   return gulp.src(['./public/app/js/fun_gulp.js','./public/app/js/gulp_fun.js','./public/app/js/multipleselect.jquery.js'])
       .pipe(uglify())
       .pipe(gulp.dest('./public/vendor/bootstrap/dist/js/play-gulp'));
});

gulp.task('concatenate', function(){
   return gulp.src(['./public/app/js/fun_gulp.js','./public/app/js/gulp_fun.js','./public/app/js/multipleselect.jquery.js'])
       .pipe(concat('all.js'))
       .pipe(gulp.dest('./public/vendor/bootstrap/dist/js/play-gulp'));
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], { //definately may need edit
        read: false
    });

    var injectOptions = {
        ignorePath: '/public' //may need edit
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib', //where all the stuff is like bootstrap jQuery etc
        ignorePath: '../../public' //may need edit
    };
    //Here propbably some other views or maybe jade
    //Probably different path

    // After that you put
    // FOR wiredep
    // <!-- bower:js -->
    // <!-- endbower -->
    // <!-- bower:css -->
    // <!-- endbower -->
    // in the view (e.g. index.html)
    //!!!!!!!!!!!!!!! CSS TO WORK REQUIRES THIS:
    // in (main) bower.json
    //    "overrides": {
    //        "bootstrap": {
    //            "main": [
    //                "dist/js/bootstrap.js",
    //                "dist/css/bootstrap.min.css",
    //                "less/bootstrap.less"
    //            ]
    //        },
    //        "font-awesome": {
    //            "main": [
    //                    "less/font-awesome.less",
    //                    "css/font-awesome.min.css",
    //                    "scss/font-awesome.scss"
    //                ]
    //        }
    //    }
    //!!!!!!! FOR gulp-inject
    // <!-- inject:css -->
    // <!-- endinject -->
    // <!-- inject:js -->
    // <!-- endinject -->

    return gulp.src('.src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function () {
    var options = {
        script: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 3030
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });

});
gulp.task('default',['serve','ugly','concatenate']);