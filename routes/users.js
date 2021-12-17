var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* Array to save users */
var users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {

  const response = users.map(userName => {

    return {user: userName}
  })

  res.status(200).json(response);

});

/* POST insert new user. */
router.post('/', function (req, res) {
 
 var name = req.body.name || '';

 if(users.includes(name)){

  res.status(409).json({error: 'Ya existe un usuario con ese nombre.'});

 }
 else {
   
  users.push(name);
  res.status(201).setHeader('Location', `http://localhost:3001/users/${name}`);
  res.json({name});
  
 }
}

);

module.exports = router;
