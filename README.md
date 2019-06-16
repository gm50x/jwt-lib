# Simple JWT-LIB

    jwt.create(header, body, key);      
        >>> creates a jwt token
    jwt.decode(token);
        >>> decodes token header and body
    jwt.verify(token, key);
        >>> verifies that a given token is valid for a key
    jwt.sign(header, body, key);
        >>> creates a token digital signature

## Actually useful functions:
* jwt.create()
* jwt.decode();
* jwt.verify();