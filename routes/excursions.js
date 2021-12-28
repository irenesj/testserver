var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* Array to save excursions */
var excursions = [
    
    {
        name: "Oviedo",
        area: "Centro",
        dificulty: "Sencilla",
        hours: 4,
        description: "En esta excursión veremos los sitios más importantes de la ciudad"

    },
    {
        name: "Picos de Europa",
        area: "Este",
        dificulty: "Difícil",
        hours: 5,
        description: "Pasearemos por las montañas de este parque"

    },
    {
        name: "Lastres",
        area: "Centro",
        dificulty: "Sencilla",
        hours: 4,
        description: "Veremos los sitios más importantes del pueblo"

    }

];

/* GET excursions listing. */
router.get('/', function(req, res, next) {


    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(excursions);
  
  });
  
/* POST insert new excursion. */
router.post('/', function (req, res) {
   
   var name = req.body.name || '';
  
   if(excursions.includes(name)){
  
    res.status(409).json({error: 'Ya existe una excursión con ese nombre.'});
  
   }
   else {
     
    excursions.push(name);
    res.status(201).setHeader('Location', `http://localhost:3001/excursions/${name}`);
    res.json({name});
    
   }
  }
  
  );
  
  module.exports = router;