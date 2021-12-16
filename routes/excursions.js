var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* Array to save excursions */
var excursions = [
    
    {
        nombre: "Oviedo",
        zona: "Centro",
        dificultad: "sencilla",
        horas: 4,
        descripcion: "Ver los sitios más importantes de la ciudad"

    },
    {
        nombre: "Parque natural del Ponga",
        zona: "Este",
        dificultad: "dificil",
        horas: 5,
        descripcion: "Ver los sitios más importantes del parque"

    },
    {
        nombre: "Lastres",
        zona: "Centro",
        dificultad: "sencilla",
        horas: 4,
        descripcion: "Ver los sitios más importantes del pueblo"

    }

];

/* GET excursions listing. */
router.get('/', function(req, res, next) {

    res.status(200).json(excursions);
  
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