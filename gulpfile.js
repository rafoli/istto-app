// Constants
var API_URL     = "http://localhost:5555/";
var DEV_API_URL = "http://localhost:5555/";

// Dependencies
var gulp        = require("gulp");
var Server      = require("karma").Server;
var useref      = require("gulp-useref");
var gulpif      = require("gulp-if");
var uglify      = require("gulp-uglify");
var minifyCss   = require("gulp-minify-css");
var minimist    = require("minimist");
var replace     = require("gulp-replace");
var s3          = require("gulp-s3");
var runSequence = require("run-sequence");
var rename      = require("gulp-rename");
var clean       = require("gulp-clean");
var serve       = require('gulp-serve');

// CLI Options
var knownOptions = {
  string: "env",
  default: { env: process.env.NODE_ENV || "production" }
};

var options = minimist(process.argv.slice(2), knownOptions);
var isDevelopment = (options.env === "development");
var newHash = new Date().getTime() + Math.random().toString().replace(".","");

// Karma Watch Test
gulp.task("test", function (done) {
  new Server({
    configFile: __dirname + "/karma.conf.js",
    singleRun: false
  }, done).start();
});

// Compress Assets to Build tolder
gulp.task("compress-assets", function () {
  var assets = useref.assets();
  return gulp.src("app/*.html")
    .pipe(assets)
    .pipe(gulpif("*.js", uglify({mangle: false})))
    .pipe(gulpif("*.css", minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulpif(!isDevelopment, replace(DEV_API_URL, API_URL)))
    .pipe(gulp.dest("build"));
});

// Copy Views Files to Build tolder
gulp.task("copy-views", function () {
  return gulp.src("app/templates/**/*.*")
    .pipe(gulp.dest("build/templates"));
});

// Copy Images to Build tolder
gulp.task("copy-images", function () {
  return gulp.src("app/assets/images/**/*.*")
    .pipe(gulp.dest("build/assets/images"));
});

// Build Chaining Task
gulp.task("build", function (callback) {
  runSequence("clean-assets",
              "compress-assets",
              ["copy-views", "copy-images"],
              "assets-hash",
              "assets-hash-clean",
              callback);
});

// Clean Assets
gulp.task("clean-assets", function () {
  gulp.src(["build/application-*.*"], {read: false, force: true})
    .pipe(clean());
});

// Append Hash to the Assets
gulp.task("assets-hash", ["assets-hash-html", "assets-hash-js", "assets-hash-css"]);
gulp.task("assets-hash-html", function () {
  return gulp.src("build/index.html")
    .pipe(replace("application.js", "application-" + newHash + ".js"))
    .pipe(replace("application.css", "application-" + newHash + ".css"))
    .pipe(gulp.dest("build"));
});

gulp.task("assets-hash-js", function () {
  return gulp.src("build/application.js")
    .pipe(rename("application-" + newHash + ".js"))
    .pipe(gulp.dest("build"))
});

gulp.task("assets-hash-css", function () {
  return gulp.src("build/application.css")
    .pipe(rename("application-" + newHash + ".css"))
    .pipe(gulp.dest("build"))
});

gulp.task("assets-hash-clean", function () {
  return gulp.src(["build/application.css", "build/application.js"])
    .pipe(clean())
});

// Deploy to S3 Task
gulp.task("deploy-action", function () {
  var credentials = {
    "key":    process.env.TML_S3_KEY || "------",
    "secret": process.env.TML_S3_SECRET || "------",
    "bucket": process.env.TML_S3_BUCKET || "------",
    "region": process.env.TML_S3_REGION || "sa-east-1"
  };

  var s3Options = { headers: {"Cache-Control": "max-age=315360000, no-transform, public"} };

  return gulp.src("build/**")
    .pipe(s3(credentials, s3Options));
});

gulp.task("deploy", function (callback) {
  console.log('Building and deploying...');

  runSequence("build",
              "deploy-action",
              callback);
});

// Local Server
gulp.task('dev-server', serve({
  root: ['app'],
  port: 8000
}));
