'use strict';

// include gulp
var gulp       = require('gulp');

// include plug-ins
var changed        = require('gulp-changed');
var imagemin       = require('gulp-imagemin');
var minifyHTML     = require('gulp-minify-html');
var jshint         = require('gulp-jshint');
var concat         = require('gulp-concat');
var stripDebug     = require('gulp-strip-debug');
var uglify         = require('gulp-uglify');
var autoprefix     = require('gulp-autoprefixer');
var minifyCSS      = require('gulp-minify-css');
var sass           = require('gulp-sass');
var notify         = require("gulp-notify");
//src file
var htmlSrc        = './src/html/*.html';
var srcjade        ='./src/jade/*.jade';
var srcsass        ='./src/sass/styles.scss';
var imgSrccss      ='./src/img/**/*';
var imgSrc         = './src/images/**/*';
var sourcesjs      = [     
                       'bower_components/modernizr/modernizr.js',
                       'bower_components/jquery/dist/jquery.js',
                        
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
                        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
                        
                        'bower_components/waterwheelcarousel/js/jquery.waterwheelCarousel.js',

                       './src/scripts/*.js'
                    ];


//src target
var csstarget      = './www/assets/styles/';
var htmlDst        = './www/';
var sasstarget     = './www/assets/styles';
var pathjstarget   = './www/assets/scripts/';
var fontsTargetbs  = './www/assets/fonts/bootstrap/';
var imgDst         = './www/assets/images';
var opensanstarget = './www/assets/fonts/open-sans/';
var imgDstcss      ='./www/assets/styles/img';
// tasks 
  
 

gulp.task('copyopensans', function() {
    gulp.src('./bower_components/open-sans/fonts/*/*')
        .pipe(gulp.dest(opensanstarget));
});

gulp.task('copyfont', function() {
    gulp.src([ './bower_components/bootstrap-sass/assets/fonts/bootstrap/*', 
               './bower_components/components-font-awesome/fonts/*'
             ])
        .pipe(gulp.dest(fontsTargetbs))
         .pipe(notify({
            title: 'fontIconBootstrap',
            message: 'copy Complide'

    }));

});

// JS hint task
gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
           .pipe(notify("jshint-complete the work!"));
});
// minify new images
gulp.task('imagemin', function() {
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
         .pipe(notify({
            title: 'imagemin',
            message: 'imagemin-complete the work!'
    }));
});
// minify new or changed HTML pages
gulp.task('htmlpage', function() {
    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst))
         .pipe(notify({
            title: 'html',
            message: 'html-complete the work!'
    }));
});
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
   gulp.src(sourcesjs)
        .pipe(concat('script.js'))
        .pipe(stripDebug())
        .pipe(uglify())

    .pipe(gulp.dest(pathjstarget))
    .pipe(notify({
            title: 'scripts',
            message: 'scripts-complete the work!'
    }));
});


gulp.task('sass', function () {
   
  gulp.src(srcsass) 
  .pipe(notify({
            title: 'sass',
            message: 'start!'
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(sasstarget))
    .pipe(notify({
            title: 'sass',
            message: 'sass-complete the work!'
    }));
});


gulp.task('watch', ['imagemin', 'sass', 'htmlpage',  'scripts'],  function() {

   gulp.watch('./src/html/*.html', function() {
    gulp.run('htmlpage');
    });
    gulp.watch('./src/scripts/*.js', function() {
        gulp.run('jshint', 'scripts');
    });
    gulp.watch('./src/sass/{,*/}*.{scss,sass}', function() {
        gulp.run('sass');
    });
    gulp.watch('./src/images/*', function() {
        gulp.run('imagemin');
    });

});



/// gulp default
gulp.task('default', function() {
 
        gulp.run('htmlpage');
        gulp.run('jshint', 'scripts');
        gulp.run('styles');
        gulp.run('sass');
        gulp.run('imagemin'); 

});



