var gulp = require("gulp");
var sass = require('gulp-sass');

gulp.task("plugins", function(){
    return gulp.src("./css/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("watch", function(){
    gulp.watch("./css/sass/*.scss", ["plugins"]);
});