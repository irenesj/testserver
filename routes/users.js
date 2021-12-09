var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json([
      {nombre: "usuario1"},
      {nombre: "usuarioA"}
  ])
});

/* POST new user. */
router.post('/', function (req, res) {
 
  var nombre = req.body.nombre || '';

  res.send('{'
          + nombre + 
          + '}'
  );

});

module.exports = router;
