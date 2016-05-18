var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var casperJs = require('gulp-casperjs');
var app = require('./server.js');
var htmlmin = require('gulp-htmlmin');
var csso = require('gulp-csso');
var server = '';
var s3 = require('gulp-s3-upload')(config);
var sass = require('gulp-sass');

var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var S3_BUCKET = process.env.S3_BUCKET_NAME;

var config = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
}

var dir = {
  public: './public',
  assets: './public/assets',
  css: './public/**/*.css',
  js: './public/**/*.js',
  html: './public/**/*.html',
  scss1: './public/assets/scss/*.scss',
  scss2: './public/assets/scss/**/*.scss',
  min: './min',
}

// Real time
gulp.task('routes', function () {
  return gulp.src('server.spec.js', {read: false}).pipe(mocha());
})

gulp.task('casper', function () {
  gulp.src('casperTest.js')
    .pipe(casperJs());
});

gulp.task('go', function () {
  nodemon({script: 'server.js'})
      // .on('start', ['routes', 'casper'])
})

gulp.task('watch', function () {
  var watcherCSS = gulp.watch(dir.css, ['minifyCSS', 'upload_s3']);
  watcherCSS.on('change', function(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  })
  var watcherJS = gulp.watch(dir.js, ['copyJS', 'upload_s3']);
  var watcherSCSS1 = gulp.watch(dir.scss1, ['sass']);
  var watcherSCSS2 = gulp.watch(dir.scss2, ['sass']);
  var watchHtml = gulp.watch(dir.html, ['minifyHTML', 'upload_s3']);
})

// Travis
gulp.task('test', ['go'], function () {
  setTimeout(function () {
    return process.exit();
  }, 10000);
});
gulp.task('minifyHTML', function() {
  return gulp.src(dir.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dir.min))
});

gulp.task('minifyCSS', function(){
  return gulp.src(dir.css)
          .pipe(csso())
          .pipe(gulp.dest(dir.min));
})
gulp.task('copyJS', function(){
  return gulp.src(dir.js)
          .pipe(gulp.dest(dir.min));
})
gulp.task("upload_s3", function() {
  return  gulp.src("./min/**")
            .pipe(s3({
                Bucket: S3_BUCKET + '/site',
                ACL: 'public-read',
            }));
});

gulp.task('sass', function() {
  return gulp.src('./public/assets/scss/*.scss')
              .pipe(sass().on('error', sass.logError))
              .pipe(gulp.dest(dir.assets))
})
