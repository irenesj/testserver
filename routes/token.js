const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const users = require('../data/usersData');
const tokens = require('../data/tokensData');

// http://localhost:3001/token/
router.get('/:token', function(req, res){

    const currentToken = req.params["token"];

    //  200 204, si currentToken está en tokens => token válido
    if(currentToken in tokens) {

        const userMail = tokens[currentToken];
        const arrayUser = users.filter( user => (user.mail) == userMail );
        const userCopy = {
            ...arrayUser[0]
          }
      
        delete userCopy["password"];

        res.status(200).json({ "user" : userCopy });

    }
     // y si no => token no válido
    // 404
    else{

        res.status(404).send();

    }

})

/** OPTIONS */
router.options('/', function(req, res){
  
    res.status(200);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
    res.send();
  
  }
);

module.exports = router;