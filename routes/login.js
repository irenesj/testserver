var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var users = require('../data/users');
var tokens = require('../data/tokens');
  
  
  // This function generates a token with 10 random letters and numbers
  const generateToken = () => {
  
    const avalaibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let token = '';
  
    for ( let i = 0; i < length; i++ ) {
      token += avalaibleChars.charAt(Math.floor(Math.random() * avalaibleChars.length));
    }
  
    return token;
    
  }


/** LOGIN */
router.post('/', function(req, res){

    const token = generateToken();

})

