const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "docs",
    },
  });

  gulp.watch("docs/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("docs/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("docs/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("docs/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));
