'use strict';
 
var gulp = require('gulp4');
var http = require('http');
var ecstatic = require('ecstatic');
var browserSync = require('browser-sync').create();
var Q = require('q');
var path = require('path');
var argv = require('yargs').argv;

const port = "8080";
const publicDir = "public";
const indexPage = argv.page;

gulp.task('launch:node', function(){
    let deferred = Q.defer();
    http.createServer(
        ecstatic({ root: path.join(__dirname, publicDir) })
    ).listen(port);
    console.log('Started http server on :' + port);
    deferred.resolve();
    return deferred.promise;
});

gulp.task('launch:browser', function () {
    browserSync.init({
        proxy: "http://localhost:" + port + "/" + indexPage
    });
    gulp.watch("public/**/*").on('change', browserSync.reload);
});

gulp.task('launch', gulp.series(
                            'launch:node', 
                            'launch:browser'
                    ));