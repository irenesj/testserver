const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const users = require('../data/usersData');
const { validToken } = require('../helpers/helpers'); 


/* GET */
router.get('/', function(req, res, next) {

  const response = users.map(userMail => {

    return {user: userMail}
  })

  res.status(200).json(response);

});

/** Counter for users's id */
let counter = 2; 

/* POST */
router.post('/', function (req, res) {
 
  const { mail } = req.body;

  let arrayResult = users.filter(user => (user.mail).toLowerCase() == mail.toLowerCase());
  
  if(arrayResult.length > 0){
    res.status(409).json({error: 'Ya existe un usuario con ese correo electrónico.'});
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

/** PUT for updating user info */
router.put('/:mail', function(req, res, next){

  // compruebo si tiene token y si pertenece al usuario 
  if(!req.headers.authorization){

    res.status(401).send();
    return;

  }
  const currentToken = validToken(req.headers.authorization.substring("Bearer ".length));
  const currentMail = req.params["mail"];
  const currentUser = users.filter(user => (user.mail).toLowerCase() == currentMail.toLowerCase());

  if(currentToken && currentUser[0]){

    console.log(req.body);
    Object.assign(currentUser[0], req.body);
    delete currentUser[0]["password"];
    res.status(200).json(currentUser[0]);

  }
  else{

    res.status(401).send();

  }

});

/** PUT for updating the users's excursions lists */
router.put('/:mail/excursions/:id', function(req, res, next){

   // compruebo si tiene token y si pertenece al usuario 
   if(!req.headers.authorization){

    res.status(401).send();
    return;

  }
  const currentToken = validToken(req.headers.authorization.substring("Bearer ".length));
  const currentMail = req.params["mail"];
  const currentUser = users.filter(user => (user.mail).toLowerCase() == currentMail.toLowerCase());

  if(currentToken && currentUser[0]){

    console.log(req.body);
    currentUser[0].excursions.push(parseInt(req.params["id"]));
    res.status(200).json(currentUser[0]);  

  }
  else{

    res.status(401).send();

  }

})

/** OPTIONS */
router.options('/', function(req, res){
  
  res.status(200);
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
  res.send();

}
);

module.exports = router;
