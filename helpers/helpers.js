const tokens = require('../data/tokensData');


const validToken = (authorizationString) => {

    return authorizationString in tokens;

}

// This function generates a token with 40 random letters and numbers
const generateToken = () => {

    const avalaibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 40;
    let token = '';

    for (let i = 0; i < length; i++) {
        token += avalaibleChars.charAt(Math.floor(Math.random() * avalaibleChars.length));
    }

    return token;

}

module.exports = {

    validToken,
    generateToken

}