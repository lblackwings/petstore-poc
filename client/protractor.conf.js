exports.config = {
    // The address of a running selenium server.
    // If specified, Protractor will connect to an already running instance of selenium. This usually looks like
    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            args: ['--test-type']
        }
    },
//    capabilities: {
//        'browserName': 'phantomjs',
//
//        /*
//        * Can be used to specify the phantomjs binary path.
//        * This can generally be ommitted if you installed phantomjs globally.
//        */
//        'phantomjs.binary.path':'./node_modules/phantomjs/lib/phantom/phantomjs.exe',
//
//        /*
//        * Command line arugments to pass to phantomjs.
//        * Can be ommitted if no arguments need to be passed.
//        * Acceptable cli arugments: https://github.com/ariya/phantomjs/wiki/API-Reference#wiki-command-line-options
//        */
//        'phantomjs.cli.args':['--webdriver=localhost:4444', '--ssl-certificates-path=./tools/security/keystore/gedoc-localhost.pem']
//    },

    // Spec patterns are relative to the current working directly when protractor is called.
    specs: ['test/e2e/externalLink.spec.js'],

    // Determines application base url.
    baseUrl: 'https://localhost:8772'
}