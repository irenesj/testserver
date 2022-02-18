var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var users = require('../data/usersData');


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
 
  const {name} = req.body;

  let arrayResult = users.filter(user => (user.name).toLowerCase() == name.toLowerCase()) 
  
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

/** OPTIONS */
router.options('/', function(req, res){
  
  res.status(200);
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.send();

}
);

module.exports = router;
