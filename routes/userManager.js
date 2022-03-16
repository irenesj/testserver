const users = require('../data/usersData');

const searchFor = (param1, param2) => {
    
    return users.filter(user => param1 == param2); 
    
}