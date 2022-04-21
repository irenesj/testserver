const users = require('../data/usersData');
const tokens = require('../data/tokensData');

const validToken = (authorizationString) => {

    return authorizationString in tokens;

}


module.exports = {

    validToken,
    
}