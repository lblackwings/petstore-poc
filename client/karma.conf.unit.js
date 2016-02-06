module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files
        // if you set it to current dir like here, all your other paths can just be relative to it
        basePath: ".",

        frameworks: ["jasmine"],

        // list of files / patterns to load in the browser
        files: [
            // Libraries of Angular Module
            'src/lib/jquery/jquery-1.10.1.js',
            'src/lib/jquery-ui/jquery-ui.js',
            'src/lib/angular/angular.js',
            'test/lib/angular-mocks.js',
            'src/lib/angular/angular-sanitize.js',
            'src/lib/angular-inheritance/angular-inheritance.js',
            'src/lib/angular-ui-router/angular-ui-router.js',
            'src/lib/angular-translate/angular-translate.js',
            'src/lib/angular-translate/angular-translate-loader-partial.js',
            'src/lib/angular-translate/angular-translate-loader-static-files.js',
            'src/lib/angular-translate/angular-translate-storage-cookie.js',
            'src/lib/bootstrap/bootstrap.js',
            'src/lib/underscorejs/underscore.1.6.0.js',
            'src/lib/moment/moment-with-langs.js',

            // Test Libraries
            'test/lib/angular-mocks.js',

            // Sources of our Angular Application
            'src/app/app.js',
            'src/app/_shared/controller/event/eventController.js',
            'src/app/_shared/controller/crud/searchController.js',
            'src/app/_shared/service/httpService.js',
            'src/app/_shared/service/crudsService.js',
            'src/app/main/controller/mainController.js',

            'src/app/**/*.js',
            // Tests of our Angular Application
            'test/unit/main/mainController.test.js',

            // Fixtures // Static data for some callbacks
            {pattern: 'test/data/*.json', watched: true, served: true, included: false }
        ],

        // list of files to exclude
        exclude: [
        ],
        preprocessors: {
            "*/.html": []
        },

        // test results reporter to use
        reporters: ['progress', 'junit', 'coverage'],

        /** JUnit Reporter */
        junitReporter: {
            outputFile: 'target/test/results.xml'
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'target/coverage/'
        },

        // web server port
        port: 9999,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ["PhantomJS"],
        // browsers: ["Chrome"],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 20000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        plugins: [
            "karma-jasmine",
            "karma-coverage",
            "karma-junit-reporter",
            "karma-phantomjs-launcher",
            "karma-chrome-launcher"
        ]
    });
};