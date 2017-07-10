exports.config = {
    allScriptsTimeout: 99999,
    directConnect: true,
    framework: 'mocha',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/e2e/**-spec.js'],

    mochaOpts: {
        // enableTimeouts: false
        timeout: 30000
    }
};
