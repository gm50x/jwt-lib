/**
 * Test runner for the app.
 * 
 */

// Container for the tests
const _app = {};

// Import the tests
_app.tests = {
    unit: require('./unit'),
    api: require('./api')
}

// Colors for test output
_app.COLORS = {
    GREEN: '\x1b[32m%s\x1b[0m',
    RED: '\x1b[31m%s\x1b[0m'
}

// Count the number of tests
_app.countTests = () => {
    let numberOfTests = 0;
    Object.keys(_app.tests).forEach(testClass => {
        numberOfTests += Object.keys(_app.tests[testClass]).length;
    });
    return numberOfTests;
}

// Produce Reports
_app.produceReport = (limit, successes, errors) => {
    if (errors.length) {
        console.log('##### ##### ##### ##### #####');
        console.log('BEGIN TEST DETAILS');
        errors.forEach(e => {
            console.log(_app.COLORS.RED, e.name);
            console.log(e.error);
        });
    }

    console.log('##### ##### ##### ##### #####');
    console.log('END TEST REPORTS');
    console.log('PASS: ' + successes);
    console.log('FAIL: ' + errors.length);
    console.log('TOTAL: ' + limit);
}

// Run the tests
_app.run = () => {
    const limit = _app.countTests();
    const errors = [];
    let successes = 0;
    let counter = 0;

    console.log('BEGIN TEST REPORT');
    Object.keys(_app.tests).forEach(testClass => {
        Object.keys(_app.tests[testClass]).forEach(testName => {
            const test = _app.tests[testClass][testName];
            // Tests succeed if they do not throw
            try {
                test(() => {
                    console.log(_app.COLORS.GREEN, 'PASS: ' + testName);
                    successes++;
                    counter++;
                    if (counter === limit) {
                        _app.produceReport(limit, successes, errors);
                    }
                });
            } catch (e) {
                console.log(_app.COLORS.RED, 'FAIL: ' + testName);
                errors.push({
                    name: testName,
                    error: e
                });

                counter++;
                if (counter === limit) {
                    _app.produceReport(limit, successes, errors);
                }
            }
        });
    });
}

// Start the test runner
_app.run();
