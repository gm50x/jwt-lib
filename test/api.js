/**
 * API Tests
 * Tests the api logic and functionality.
 * 
 */

// Dependencies
const assert = require('assert');

const app = require('../index');

// Container for the tests
const api = {};

api['Assert app runs without throwing'] = (done) => {
    assert.doesNotThrow(() => {
        app.init(() => {
            done();
        });
    });
}

// Exports the tests
module.exports = api;
