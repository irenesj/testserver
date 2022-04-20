const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const users = require('../data/usersData');
const { validToken } = require('../helpers/helpers'); 


/* GET */
router.get('/', function(req, res, next) {

  const response = users.map(userName => {

    return {user: userName}
  })

  res.status(200).json(response);

});

/** Counter for users's id */
let counter = 2; 

/* POST */
router.post('/', function (req, res) {
 
  const { name } = req.body;

  let arrayResult = users.filter(user => (user.name).toLowerCase() == name.toLowerCase());
  
  if(arrayResult.length > 0){
    res.status(409).json({error: 'Ya existe un usuario con ese nombre.'});
  }
  else {
   
   const user = {
    
      ...req.body,
      id: counter

    };
    users.push(user);
    res.status(201).setHeader('Location', `http://localhost:3001/users/${counter}`);
    counter++;
    res.json(user);
  }
}

);

/** PUT */
router.put('/:mail', function(req,res, next){

  // compruebo si tiene token y si pertenece al usuario 
  // mal => 401
  // bien => next
  const currentToken = validToken();

  if(currentToken && users.filter(user => (user.mail).toLowerCase() == mail.toLowerCase())){


    res.status(200).send();

  }
  else{

    res.status(401).send();

  }

});

/*router.put('/:mail', function(req,res){

  const mail = req.params["mail"];

  let currentArray = users.filter(user => (user.mail).toLowerCase() == mail.toLowerCase());

  if(currentArray.length > 0){

    const user = currentArray[0];

    user.name = req.body["name"];
    res.status(200).send();

  }
  else{

    res.status(401).json({error: 'Error'});

  }

});*/

  


/** OPTIONS */
router.options('/', function(req, res){
  
  res.status(200);
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
  res.send();

}
);

module.exports = router;
