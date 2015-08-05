gulp = require 'gulp'
$ = require('gulp-load-plugins')()
pkg = require './package.json'
moment = require 'moment'
$.q = require 'q'
del = require 'del'
clientFiles = [
    'src/<%= props.addonFileName %>-module.js'
    "src/#{pkgName}-tmpl.js"
    'src/**/*.js'
    '!public/**/*'
]

pkgName = pkg.name.toLowerCase()

licenses = if pkg.licenses? then _.pluck(pkg.licenses, "type").join(", ") else ''

banner = "/*! Dolphin Addon */\n\n"

gulp.task 'jscs', ->
    gulp.src clientFiles.concat "!src/#{pkgName}-tmpl.js"
    .pipe($.jscs())

gulp.task 'tests', ['jscs'], ->
    karma = require('karma')
    karmaConfig = __dirname + '/karma.conf'
    karma.server.start {
        configFile: karmaConfig
        singleRun: yes
    }

gulp.task 'update_json', ->
    gulp.src('./bower.json')
    .pipe($.jsonTransform ((data)->
            data.name = pkg.name || ''
            data.version = pkg.version || ''
            data.description = pkg.description || ''
            data
        ), 4)
    .pipe(gulp.dest('./'))

gulp.task 'ngtemplates:clean', (cb)-> del "./src/#{pkgName}-tmpl.js", cb

gulp.task 'ngtemplates', ->
    dfrd = $.q.defer()
    gulp.src('./src/**/*.html')
    .pipe($.ngTemplates {
            module: pkgName + 'Templates',
            path: (path, base)-> path.replace(base, pkgName + '-' + pkg.version + '\/')
        })
    .pipe($.concat(pkgName + '-tmpl.js'))
    .pipe(gulp.dest('./src'))
    .on('end', dfrd.resolve)
    dfrd.promise

gulp.task 'concat', ['ngtemplates'], ->
    gulp.src(clientFiles)
    .pipe $.sourcemaps.init()
    .pipe($.babel())
    .pipe($.ngAnnotate single_quotes: true)
    .pipe($.concat(pkgName + '.min.js'))
    .pipe $.sourcemaps.write('./')
    .pipe(gulp.dest('./public'))

gulp.task 'concat:css', ->
    gulp.src(['./src/**/*.css'])
    .pipe $.sourcemaps.init()
    .pipe $.postcss [$.autoprefixer { browsers: ['last 2 version'] }]
    .pipe($.concat pkgName + '.css')
    .pipe $.sourcemaps.write()
    .pipe(gulp.dest 'public')

gulp.task 'watch', ['update_json', 'concat', 'concat:css'], ->
    gulp.watch ['./src/**/*.js', './src/**/*.html', '!./public/**'], ['concat']
    gulp.watch ['./src/**/*.css', '!./public/**'], ['concat:css']

gulp.task 'default', ['concat:css', 'concat', 'update_json']
