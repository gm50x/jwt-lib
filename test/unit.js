/**
 * Unit Tests
 * Tests specific functions through the program.
 * 
 */

// Dependencies
const assert = require('assert');
const jwt = require('../lib/jwt');

// Container for the tests
const unit = {};

unit['Assert jwt.base64URL() encodes JSON to base64 with no errors'] = done => {
    const json = {foo: 'bar', fizz: 'buzz'};
    const jsonB64 = jwt.base64URL(json);
    const expected = Buffer.from(JSON.stringify(json)).toString('base64');
    
    assert.strictEqual(jsonB64, expected);
    done();

}

unit['Assert jwt.create() returns expected token'] = done => {
    const header = {alg: 'HS256', typ: 'JWT'};
    const body = {sub: '1234567890', name: 'John Doe', iat: 1516239022};
    const token = jwt.create(header, body, 'secret');
    const expected = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o';
 
    assert.strictEqual(token, expected);
    done();
}

// Exports the tests
module.exports = unit;
