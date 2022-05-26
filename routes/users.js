const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const users = require('../data/usersData');
const { validToken } = require('../helpers/helpers'); 


/* GET to get the users mail*/
router.get('/', function(req, res, next) {

  const response = users.map(userMail => {

    return {user: userMail}
  })

  res.status(200).json(response);

});

/** Counter for users's id */
let counter = 2; 

/* POST for creating a new user*/
router.post('/', function (req, res) {
 
  // First we get the mail of the user that wants to register
  const { mail } = req.body;

  let arrayResult = users.filter(user => (user.mail).toLowerCase() == mail.toLowerCase());


  // And then see if there´s already a user with that mail
  if(arrayResult.length > 0){
    res.status(409).json({error: 'Ya existe un usuario con ese correo electrónico.'});
  }
  else {

   // If there´s not, we create an user with the info sent in the petition, an empty array of excursions and an id
   const user = {
    
      ...req.body,
      excursions: [],
      id: counter

    };
    // And then we add it to the array of users
    users.push(user);
    res.status(201).setHeader('Location', `http://localhost:3001/users/${counter}`);
    counter++;
    res.json(user);
  }
}

);

/** PUT for updating user info */
router.put('/:mail', function(req, res, next){

  // We see if the token is valid and if it pertains to the user that wants to update his/her info 
  if(!req.headers.authorization){

    res.status(401).send();
    return;

  }
  const currentToken = validToken(req.headers.authorization.substring("Bearer ".length));
  const currentMail = req.params["mail"];
  const currentUser = users.filter(user => (user.mail).toLowerCase() == currentMail.toLowerCase());

  if(currentToken && currentUser[0]){

    Object.assign(currentUser[0], req.body);
    res.status(200).json(currentUser[0]);

  }
  else{

    res.status(401).send();

  }

});

/** PUT for updating the users's excursions lists */
router.put('/:mail/excursions/:id', function(req, res, next){

   // We see if the token is valid and if it pertains to the user that wants to update his/her info  
   if(!req.headers.authorization){

    res.status(401).send();
    return;

  }
  const currentToken = validToken(req.headers.authorization.substring("Bearer ".length));
  const currentMail = req.params["mail"];
  const currentUser = users.filter(user => (user.mail).toLowerCase() == currentMail.toLowerCase());

  if(currentToken && currentUser[0]){

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
