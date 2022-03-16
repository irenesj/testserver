const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const users = require('../data/usersData');
const tokens = require('../data/tokensData');

router.get('/:token', function(req, res){

    const currentToken = req.params["token"];

    //  200 204, si currentToken está en tokens => token válido
    if(currentToken in tokens) {

        const userName = tokens[currentToken];
        const user = users.filter(user => (user.name).toLowerCase() == userName.toLowerCase()) 
        res.status(204).json({"user" : user});

    }
     // y si no => token no válido
    // 404
    else{

        res.status(404).send();
    }

})

module.exports = router;