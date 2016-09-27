var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var __dir__ = './assets/';
var reload = browserSync.reload;
var path = {
   style: [__dir__ + 'sass/main.scss'],
   pug: ['./html-source/pages/*.pug']
}
gulp.task('pug', function () {
   return gulp.src(path.pug)
      .pipe(pug({
         pretty: true
      }))
      .pipe(gulp.dest('./html/'))
      .pipe(reload({
         stream: true
      }))
});
gulp.task('partials-pug', function () {
   return gulp.src('./html-source/**/*.pug')
      .pipe(reload({
         stream: true
      }))
})
gulp.task('sass', function () {
   return gulp.src(__dir__ + "sass/**/*.scss")
      .pipe(sass({
         outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(gulp.dest(__dir__ + 'css/'))
      .pipe(reload({
         stream: true
      }))
});
gulp.task('server', function () {
   browserSync.init({
      server: {
         baseDir: ["./",'./html/'],
         browser: ['google-chrome']
      }
   });
});
gulp.task('watch', function () {
   gulp.watch(__dir__ + 'sass/**/*.scss', ['sass']);
   gulp.watch('./*.html', reload);
   gulp.watch('./html-source/**/*.pug', ['pug', 'partials-pug']);
});
gulp.task('build', ['sass', 'pug']);
gulp.task('default', ['build', 'watch','server'])
