const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();

// Compile SCSS
function scssTask() {
  return gulp
    .src("css/*.css")
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("dist/css"));
}

// Minify JS
function jsTask() {
  return gulp
    .src("js/*.js")
    .pipe(terser())
    .pipe(gulp.dest("dist/js"));
}

// Copy HTML files
function htmlTask() {
  return gulp.src("*.html").pipe(gulp.dest("dist"));
}

// Copy image files
function imagesTask() {
  return gulp.src("images/**/*").pipe(gulp.dest("dist/images"));
}

// Watch task
function watchTask() {
  browserSync.init({
    server: { baseDir: "./" }
  });
  gulp.watch("*.html", htmlTask).on("change", browserSync.reload);
  gulp.watch("css/*.css", scssTask).on("change", browserSync.reload);
  gulp.watch("js/*.js", jsTask).on("change", browserSync.reload);
}

// Default task
exports.default = gulp.series(
  gulp.parallel(htmlTask, scssTask, jsTask, imagesTask),
  watchTask
);

// Build task
exports.build = gulp.parallel(htmlTask, scssTask, jsTask, imagesTask);

