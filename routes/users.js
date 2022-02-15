var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* Array to save users */
var users = [

  {
    id: 0,
    name: "usuario1",
    surname: "apellidosUsuario1",
    phone: "11111111",
    mail: "usuario1@mail.com",
    password: "udfgsdufg"

  },
  {
    id: 1,
    name: "usuario2",
    surname: "apellidosUsuario2",
    phone: "11111111",
    mail: "usuario2@mail.com",
    password: "hcbdjfjbhkj"

  }
];

var tokens = {

  "9387tb8gun48": "usuario1"
  
};

let counter = 2; 

const generateToken = () => {

  const arrayNumLetAvalaible = [];
  return Math.floor(Math.random() * (max - min)) + min;
  
}

/* GET */
router.get('/', function(req, res, next) {

  const response = users.map(userName => {

    return {user: userName}
  })

  res.status(200).json(response);

});

/* POST */
router.post('/', function (req, res) {
 
  var {name} = req.body;

  let arrayResult = users.filter(user => (user.name).toLowerCase() == name.toLowerCase()) 
  
  if(arrayResult.length > 0){
    res.status(409).json({error: 'Ya existe un usuario con ese nombre.'});
  }
  else {
   // restful -> recurso, recurso/id
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
