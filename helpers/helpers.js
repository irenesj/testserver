const users = require('../data/usersData');

const validToken = () => {

    return token = req.headers.authorization.substring("Bearer ".length);

}


module.exports = {

    validToken,
    
}