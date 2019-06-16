/**
 * JWT Specific Functions
 * 
 */

// Dependencies
const crypto = require('crypto');

// Container for the app
const jwt = {};

// Encode JSON to base64
jwt.base64URL = data => {
    return Buffer.from(JSON.stringify(data))
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

// Creates a sha256 hash
jwt.sha256 = (data, secret) => {
    return crypto.createHmac('sha256', secret).update(data).digest('base64');
}

// Creates a token signature
jwt.sign = (header, body, secret) => {
    return jwt.sha256(header + '.' + body, secret);
}

// Creates a token
jwt.create = (header, body, secret) => {
    // Encode header and body to base64
    const headerB64 = jwt.base64URL(header);
    const bodyB64 = jwt.base64URL(body);

    // create the signature hash
    const signature = jwt.sign(headerB64, bodyB64, secret)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    return headerB64 + '.' + bodyB64 + '.' + signature;
}

// Verifies a token validity
jwt.verify = (token, secret) => {
    const { header, body } = jwt.decode(token);
    const retoken = jwt.create(header, body, secret);
    // Check signature
    if (token === retoken) {
        if (body.exp) {
            if (body.exp > Date.now()) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}

// Decodes a token and returns a JSON object with the header and body
jwt.decode = (token) => {
    token = token.split('.');
    const decoded = {
        header: JSON.parse(Buffer.from(token[0], 'base64').toString('utf-8')),
        body: JSON.parse(Buffer.from(token[1], 'base64').toString('utf-8'))
    };
    return decoded;
}


module.exports = jwt;