var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var log = $.util.log;
gulp.task('help', $.taskListing);
var uglify = require('gulp-uglify');


gulp.task('serve-dev', ['inject', 'browser-sync-dev']);
gulp.task('serve-build', ['final-build', 'browser-sync-build' ]);

gulp.task('browser-sync-dev', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'src/index.html'
        }
    });

    gulp.watch(config.sass, ['sass']);
    gulp.watch(config.index).on('change', browserSync.reload);

});

gulp.task('buildjs', ['optimize'], function() {
    log('Getting JS ready for Production');
  return gulp.src('./build/js/app.js')
    .pipe($.ngAnnotate())
    // .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('final-build', ['optimize','buildjs'], function(done) {
    log('Getting CSS ready for Production');
  return gulp.src('./build/styles/*.css')
    .pipe($.csso())
    .pipe(gulp.dest('./build/styles/'));

    done();
});


gulp.task('browser-sync-build', function() {
    browserSync.init({
        server: {
            baseDir: './build',
            index: 'index.html'
        }
    });
});

/**
 * Injection and Template cache
 * */

gulp.task('templateCache',['clean-code'], function(done){
    log('Creating Template Cache');
    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));

        done();
});

gulp.task('wiredep', function(done) {
    log('Wire up the bower css js and our app js into the html');
    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.source));

        done();
});

gulp.task('inject', ['wiredep', 'sass', 'templateCache'], function(done) {
    log('Wire up the app css into the html, and call wiredep ');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.source));
        done();
});


gulp.task('optimize', ['inject', 'images', 'fonts'], function(done){
    log('Optimizing HTML, CSS, JAVASCRIPT');

    var assets = $.useref();
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter('**/*.css');
    var jsLibFilter = $.filter('**/lib.js');
    var jsAppFilter = $.filter('**/app.js');

    return gulp 
            .src(config.index)
            .pipe($.plumber())
            .pipe($.inject(
                gulp.src(templateCache, {read: false}), {
                    starttag: '<!-- inject:templates:js -->'
                }
            ))
            .pipe($.useref())
            .pipe(gulp.dest(config.build));

            done();
});

/**
 * Cleaning Tasks
 * */

gulp.task('clean', function(){
    var delConfig = [].concat(config.build,config.temp);
    log('Cleaning: ', $.util.colors.blue(delConfig));
    del(delConfig);
});

gulp.task('clean-fonts', function(done) {
    clean(config.build + 'fonts/**/*.*');
    done();
});
gulp.task('clean-images', function(done) {
    clean(config.build + 'images/**/*.*');
    done();
});

gulp.task('clean-styles', function(done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    )
    clean(files);

    done();
});

<!---->

/**
 * Copying Images and Fonts to build
 * */
gulp.task('images',['clean-images'], function(done){
    log('*** Copying and Compressing Images ***')
    return gulp
        .src(config.images)
        .pipe($.imagemin())
        .pipe(gulp.dest(config.build + 'images'));

        done();

});

gulp.task('fonts', ['clean-fonts'], function(done){
    log('*** Copying Fonts ***');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
        done();
})


/**
 * Checking Out Javascript code
 * */

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function(done) {
    return gulp.src(config.sass)
        .pipe($.sass())
        .pipe(gulp.dest(config.temp))
        .pipe(browserSync.stream());
        done();
});



/**
 * Utility Functions
 * */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

