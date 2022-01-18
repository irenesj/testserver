var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

/* Array to save excursions */
var excursions = [
    
    {
        name: "Cangas de Onís",
        area: "Centro-Este",
        dificulty: "Baja",
        time: "1 día",
        description: "En Cangas iremos a ver el puente y haremos una ruta por sus iglesias."

    },
    {
        name: "Picos de Europa",
        area: "Este",
        dificulty: "Media",
        time: "2 días",
        description: "Al ser un parque tan extenso, en esta visita iremos a Los Lagos (llevando el itineriario corto) y pasaremos a ver también algo de la ruta del Cares."

    }

];

/* GET */
router.get('/', function(req, res, next) {

    const search = req.query["q"] || "";

    res.setHeader('Access-Control-Allow-Origin', '*'); 

    if(search !== ""){ 

        let searchResult = excursions.filter( excursion => (excursion.name).toLowerCase() == search.toLowerCase() );
        res.status(200).json(searchResult);

    }
    else{

        res.status(200).json(excursions);

    }
  
  });
  
/* POST */
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