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

    const filter = req.query["type"] || "";
    
    if(["area", "difficulty", "time"].includes(filter)){

        const arrayResult = filtersData.map(function(excursion){

            switch(filter){

                case 'area':
                    break;
                case 'difficulty':
                    break;
                case 'time':


            }
                

        });
        res.status(200).json();

    }
    else{

        res.status(400).json({error: "Petición incorrecta al servidor"});

    }
})


module.exports = router;