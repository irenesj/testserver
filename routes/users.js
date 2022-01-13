var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* Array to save users */
var users = [

  {
    name: "usuario1",
    surname: "apellidosUsuario1",
    phone: "11111111",
    mail: "usuario1@mail.com",
    password: "udfgsdufg",
    city: "Madrid",
    community: "Madrid",
    Province: "Madrid",
    postalCode: "28000"

  },
  {
    name: "usuario2",
    surname: "apellidosUsuario2",
    phone: "11111111",
    mail: "usuario2@mail.com",
    password: "hcbdjfjbhkj",
    city: "Orense",
    community: "Galicia",
    Province: "Orense",
    postalCode: "29000"

  }
];

/* GET */
router.get('/', function(req, res, next) {

  const response = users.map(userName => {

    return {user: userName}
  })

  res.status(200).json(response);

});

/* POST */
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
