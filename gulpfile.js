'use strict';

// Requires
const gulp = require('gulp');
const scss = require('gulp-sass');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const useref = require('gulp-useref');
const cssnano = require('gulp-cssnano');
const browsersync = require('browser-sync').create();


// diretorios
const app = 'app/';
const scss_dir = 'app/assets/scss/**/*.scss';
const css_dir = 'app/assets/css';
const js = 'app/assets/js/**/*.js';
const dist = 'dist';
const image_dir = 'app/assets/image/**/*';

// SCSS
gulp.task('scss', () => {
  return gulp.src([scss_dir,'!app/assets/scss/variavel/**'])
    .pipe(scss())
    .pipe(gulp.dest(css_dir))
    .pipe(browsersync.stream());
});

// Minificando arquivos

// js
gulp.task('minifi', () => {
  return gulp.src(app + '*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulp.dest(dist));
});

// Browser sync
gulp.task('server', () => {
  browsersync.init({
    server: {
      baseDir: 'app'
    }
  });
  
  gulp.watch(scss_dir, gulp.series('scss'));
  gulp.watch(app + '*.html', gulp.series('minifi'));
  gulp.watch(css_dir, gulp.series('minifi'));
  gulp.watch(js, gulp.series('minifi'));
  gulp.watch(image_dir, gulp.series('image'));

  gulp.watch('app/*.html').on("change", browsersync.reload);
  gulp.watch('app/assets/css/**/*.css').on("change", browsersync.reload);
  gulp.watch('app/assets/js/**/*.js').on("change", browsersync.reload);
  gulp.watch('app/assets/image/**/*').on("change", browsersync.reload);
})

// Verifica se houve modificação pasta images
gulp.task('image', ()=>{
  return gulp.src(image_dir)
    .pipe(gulp.dest('dist/assets/image'));
});


// Tarefa padrão
gulp.task('run-task', gulp.series('scss','minifi','image','server'));
