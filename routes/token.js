const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const tokens = require('../data/tokensData');

router.get('/:token', function(req, res){

    const currentToken = req.params["token"];

    //  200 204, si currentToken está en tokens => token válido
    if(currentToken in tokens) {

        res.status(204).send();

    }
     // y si no => token no válido
    // 404
    else{

        res.status(404).send();
    }

})

module.exports = router;