'use strict';

// Requires
const gulp = require('gulp');
const scss = require('gulp-sass');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const useref = require('gulp-useref');
const cssnano = require('gulp-cssnano');

// diretorios
const app = 'app/';
const scss_dir = 'app/assets/scss/**/*.scss';
const css_dir = 'app/assets/css';
const js = 'app/assets/js/**/*.js';
const dist = 'dist';

// SCSS
gulp.task('scss', () => {
  return gulp.src(scss_dir)
    .pipe(scss())
    .pipe(gulp.dest(css_dir));
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

// Verifica mudanças no arquivos
gulp.task('watch', ()=>{
  gulp.watch(scss_dir, gulp.series('scss'));
  gulp.watch(app + '*.html', gulp.series('minifi'));
  gulp.watch(css_dir, gulp.series('minifi'));
  gulp.watch(js, gulp.series('minifi'));
});


// Tarefa padrão
gulp.task('run-task', gulp.series('scss','minifi','watch'));
