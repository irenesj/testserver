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

  const { mail, password } = req.body;

  let arrayResult = users.filter(user => user.mail.toLowerCase() == mail.toLowerCase() && user.password == password); 
  
  if(arrayResult.length == 0){
    res.status(401).json({error: 'Has puesto unos datos erróneos. Inténtalo de nuevo.'});
  }
  else {
   // restful -> recurso, recurso/id
   const  t = {
    
      ...req.body,
      

    };
    users.push(user);
    res.status(201).setHeader('Location', `http://localhost:3001/users/${counter}`);
    counter++;
    res.json(user);

  const token = generateToken();

})

