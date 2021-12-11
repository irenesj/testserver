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
 res.json( {nombre: "usuario2"} );

}

);

module.exports = router;
