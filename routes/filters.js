const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const filtersData = require('../data/excursionsData'); 


/** GET */
// http://localhost:3001/filters?type=area
// http://localhost:3001/filters?type=difficulty
// http://localhost:3001/filters?type=time
router.get('/', function(req, res, next){

    let arrayResult = [];
    const filter = req.query["type"] || "";
    
    if(["area", "difficulty", "time"].includes(filter)){

        arrayResult = filtersData.map(function(excursion){

            switch(filter){

                case 'area': 
                    if(!arrayResult.includes(excursion.area))
                        arrayResult.push(excursion.area);
                        console.log(arrayResult);
                    break;
                case 'difficulty': 
                    if(!arrayResult.includes(excursion.difficulty))
                        arrayResult.push(excursion.difficulty);
                    break;
                case 'time': 
                    if(!arrayResult.includes(excursion.time))
                        arrayResult.push(excursion.time);

            }   
               
        });
        
        return res.status(200).json(arrayResult);
    }
    else{

        res.status(400).json({error: "Petición incorrecta al servidor"});

    }
})


module.exports = router;