/**
 * Build process and task manager.
 *
 * We are using Gulp (http://gulpjs.com/) to manage our build process.
 *
 * Note: Partial tasks are preceded by a _ and are most useful as part of the watch process, they have been separated out into
 * individual tasks to keep the watch builds fast. These tasks can be directly run but you are probably better off
 * looking for the build version of the task that will bundle all the build tasks for a target together.
 * Example run `grunt build/email` instead of `grunt _email/css`
 */

/**
 * ---------- Includes ----------
 */
const gulp = require('gulp-help')(require('gulp-param')(require('gulp'), process.argv)),
    webpack = require('gulp-webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    WebpackDevServer = require("webpack-dev-server"),
    gutil = require("gulp-util"),
    del = require('del'),
    webserver = require('gulp-webserver');

/**
 * ---------- Configuration Parameters ----------
 */
const config = {
    root: path.join(__dirname, "./src/"),
    dest: path.join(__dirname, "./build/"),
    tests: path.join(__dirname, "./test/"),
    environment: path.join(__dirname, "./environment/"),
    webpack: path.join(__dirname, "/webpack.config.js")
};

const ENVIRONMENT = {
    PRODUCTION: 'prod',
    DEVELOPMENT: 'dev',
    STAGING: 'staging'
};

/**
 * ---------- Error Management ----------
 */

function errorlog(err) {
    console.error(err.message);
    this.emit('end');
}

/**
 * Clean the build directory
 */
gulp.task('_build:clean', false, function () {
    return del(config.dest + '/**', {force: true});
});

gulp.task('__build', 'Build the project for an environment', ['_build:clean'], function () {

        //Move index html into build
        gulp.src(config.root + "/index.htm")
            .pipe(gulp.dest(config.dest));

    console.log(config.root + "/index.htm");

        return gulp.src(config.root + 'maim.js')
            .pipe(webpack(require(config.webpack)))
            .pipe(gulp.dest(config.dest));
    }
);

gulp.task('_build', ['_build:clean'], function () {

    gulp.src(config.root + "/index.htm")
        .pipe(gulp.dest(config.dest));

    return gulp.src(config.root + 'maim.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(config.dest));
});

/**
 * This is different to the dev server as will not be building the assets and serving the, form memory.
 * It will instead only be assets built to disk.
 *
 * This server represents the production behaviour of serving pages.
 */
gulp.task("server:light", 'A light server run against the build.', function (callback) {
    gulp.src('build')
        .pipe(webserver({
            //fallback: '/index.htm',
            //path: '/build',
            fallback: 'index.htm',
            livereload: true,
            open: true,
            directoryListing: {
                enable: true,
                path: config.dest
            }

        }));

});

/**
 * This server should be used for development, it will listen for changes on project files, notify the browser
 * of changes, and serve the new assets from memory.
 *
 * This server will not update assets on disk.
 */
gulp.task("dev-server", function (callback) {
    // Start a webpack-dev-server
    var compiler = webpack.webpack(require('./webpack.config.js'));

    new WebpackDevServer(compiler, {

        //We need webpack to serve built files form the /build/ directory
        publicPath: '/build/',

        //Hot replacement
        //hot: true,

        quiet: false,
        noInfo: true,
        stats: {
            colors: true,
        }
    }).listen(8888, "localhost", function (err) {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }

        // Server listening
        gutil.log("webpack-dev-server listening at ", "http://localhost:8888/#/");
    });
});

/**
 * ---------- Build Targets ----------
 */
gulp.task('build', 'run all the build tasks', ['_build']);

/**
 * ---------- Watch Targets ----------
 */
// gulp.task('watch', function () {
//     gulp.watch(config.email + 'assets/**/*.+(php|htm)', ['_email/template']);
// });


/**
 * ---------- Default Targets ----------
 */
gulp.task('default', ['help']);
