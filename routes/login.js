const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const users = require('../data/usersData');
const tokens = require('../data/tokensData'); // const: la referencia no se cambia, es decir, no se puede apuntar a otro sitio
const filter = require('jade/lib/filters');
  
  
// This function generates a token with 40 random letters and numbers
const generateToken = () => {

    const avalaibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 40;
    let token = '';
  
    for ( let i = 0; i < length; i++ ) {
      token += avalaibleChars.charAt(Math.floor(Math.random() * avalaibleChars.length));
    }
  
    return token;
    
}

/** LOGIN */
router.post('/', function(req, res){

  const { mail, password } = req.body;

  const arrayResult = users.filter(user => user.mail.toLowerCase() == mail.toLowerCase() && user.password == password); 
  
  if(arrayResult.length == 0){

    res.status(401).json({error: 'Datos erróneos. Inténtalo de nuevo.'});

  }
  else {

    const token = generateToken();
    tokens[token] = arrayResult[0].mail;
    console.log(tokens);
    res.status(200).setHeader('Location', `http://localhost:3001/login`);

    const userCopy = {
      ...arrayResult[0]
    }
    delete userCopy["password"];
    
    res.json({ token: token, user: userCopy });

  }
}
);

/** LOGOUT */
router.delete('/', function(req, res, next){

  const token = req.headers.authorization.substring("Bearer ".length);
  console.log(token);
  delete tokens[token];
  res.status(200);
  res.json({

    token:token
    
  });
})

/** OPTIONS */
router.options('/', function(req, res){
  
  res.status(200);
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.send();

}
);

module.exports = router;





