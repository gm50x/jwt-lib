/**
 * Main file for the application
 * 
 */

// Dependencies
const jwt = require('./lib/jwt');

// Container for the app
const app = {};

// Initialization script
app.init = (callback) => {
    if (callback) {
        callback();
    }

    // RUN DEMONSTRATION SCRIPT ONLY IF THIS IS THE MAIN MODULE
    if (require.main === module) {
        // DEMONSTRATINO CODE
        console.log('This is just some demonstration of the token lib');

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        console.log('Passing a token to the decode function: ');
        console.log(jwt.decode(token));

        const head = {
            alg: 'HS256',
            typ: 'JWT'
        }

        const body = {
            sub: '1234567890',
            name: 'foo',
            admin: true
        }

        const token2 = jwt.create(head, body, 'secret');
        console.log('Encoding data into a token');
        console.log(token2);

        const verification = jwt.verify(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImZvbyIsImFkbWluIjp0cnVlfQ.e3xbu9sDW_Ht_LOd3LZz8faJd9dIiE2GImyfyqVx2nM',
            'secret'
        );

        console.log('Verifying that a given token is valid');
        console.log(verification);
    }
}

// Only run directly if this is the main file
if (require.main === module) {
    app.init();
}

// Exporting for tests
module.exports = app;