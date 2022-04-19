const users = require('../data/usersData');

const validToken = () => {

    return token = req.headers.authorization.substring("Bearer ".length);

}

const arrayResult = (arraySearch) => {


    return users.filter(arraySearch);

}


module.exports = {

    validToken,
    arrayResult
}