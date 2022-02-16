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

/** Array of tokens */
var tokens = {

  "9387tb8gun": "usuario1"
  
};

/** Counter for users's id */
let counter = 2; 

// This function generates a token with 10 random letters and numbers
const generateToken = () => {

  var avalaibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10;
  var token = '';

  for ( var i = 0; i < length; i++ ) {
    token += avalaibleChars.charAt(Math.floor(Math.random() * avalaibleChars.length));
  }

  return token;
  
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
