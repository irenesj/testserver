var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* Array to save users */
var usuarios = [];

/* GET users listing. */
router.get('/', function(req, res, next) {

  const respuesta = usuarios.map(nombreUsuario => {

    return {usuario: nombreUsuario}
  })

  res.status(200).json(respuesta);

});

/* POST insert new user. */
router.post('/', function (req, res) {
 
 var nombre = req.body.nombre || '';

 if(usuarios.includes(nombre)){

  res.status(409).json({error: 'Ya existe un usuario con ese nombre.'});

 }
 else {
   
  usuarios.push(nombre);
  res.status(201).setHeader('Location', `http://localhost:3001/users/${nombre}`);
  res.json({nombre});
  
 }
}

);

module.exports = router;
