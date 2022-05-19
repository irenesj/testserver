const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const excursions = require('../data/excursionsData');

/* GET */
router.get('/', function(req, res, next) {

    const search = req.query["q"] || "";
    const area = req.query["area"] || "";
    const difficulty = req.query["difficulty"] || "";
    const time = req.query["time"] || "";

    res.setHeader('Access-Control-Allow-Origin', '*'); 
    let excursionsCopy = [...excursions];

    if(search !== ""){ 

        excursionsCopy = excursionsCopy.filter( excursion => (excursion.name).toLowerCase() == search.toLowerCase() );

    }

    if(area != ""){

        const areaFiltersResults = area.split(',').map(i => i.trim().toLowerCase());
        excursionsCopy = excursionsCopy.filter(excursion => areaFiltersResults.includes(excursion.area.toLowerCase()))

    }

    if(difficulty != ""){

        const difficultyFiltersResults = difficulty.split(',').map(i => i.trim().toLowerCase());
        excursionsCopy = excursionsCopy.filter(excursion => difficultyFiltersResults.includes(excursion.difficulty.toLowerCase()))

    }

    if(time != ""){

        const timeFiltersResults = time.split(',').map(i => i.trim().toLowerCase());
        excursionsCopy = excursionsCopy.filter(excursion => timeFiltersResults.includes(excursion.time.toLowerCase()))

    }

    res.status(200).json(excursionsCopy);

  
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