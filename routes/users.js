var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json([
      {nombre: "usuario1"},
      {nombre: "usuarioA"}
  ])
});

/* POST insert new user. */
router.post('/', function (req, res) {
 
 var nombre = req.body.nombre || '';

 if(req.body.nombre === "usuario1" || req.body.nombre === "usuarioA"){
  res.json('Ya existe un usuario con ese nombre.');
 }
 else {
  res.json({nombre});
 }
}

);

module.exports = router;
