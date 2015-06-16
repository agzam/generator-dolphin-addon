path = require 'path'
_ = require 'lodash'
karmaLocalConfig = undefined
try
    karmaLocalConfig = require './local.karma.conf'

files = [
    'node_modules/angular/angular.js'
    'node_modules/angular-mocks/angular-mocks.js',
    'node_modules/lodash/index.js'
    "src/<%= props.addonName %>-module.js"
    'src/**/*.js'
    'src/**/*-spec.coffee'
]

module.exports = (config)->
    kConfiguration =

        # base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.'

        # frameworks to use
        # available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon-chai']

        # list of files / patterns to load in the browser
        files: files

        # list of files to exclude
        exclude: []

        # preprocess matching files before serving them to the browser
        # available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors:
            'src/**/*.coffee': ['coffee']
            'src/**/*.js': ['babel', 'coverage']
            '**/*.json'   : ['json_fixtures']

        jsonFixturesPreprocessor:
            stripPrefix: 'src/fixtures/'

        coffeePreprocessor:
            options:
                bare: true
                sourceMap: true
            # transforming the filenames
            transformPath: (path)-> path.replace /\.coffee$/, '.js'

        # test results reporter to use
        # possible values: 'dots', 'progress'
        # available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha','coverage']

        coverageReporter:
            type: 'text'
            dir: 'bin'

        # web server port
        port: 9876

        # enable / disable colors in the output (reporters and logs)
        colors: on

        # level of logging
        # possible values:
        # config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO

        # enable / disable watching file and executing tests whenever any file changes
        autoWatch: on

        # start these browsers
        # available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        # ['PhantomJS2', 'Chrome']
        #        browsers: ['chrome_hidden']
        browsers: ['Chrome']

        customLaunchers:
            chrome_hidden:
                base: 'Chrome'
                flags: [
                    '--enable-fast-unload'
                    '--window-size=200,200'
                    #                    '--window-position=-9999,0'
                ]
        # Continuous Integration mode
        # if true, Karma captures browsers, runs the tests and exits
        singleRun: no

    if karmaLocalConfig?
        kConfiguration = _.assign kConfiguration, karmaLocalConfig

    config.set kConfiguration
