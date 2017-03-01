var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var recipeLogic = require("./recipeLogic.js")

// se usa /users/


router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/recipeType', function(req, res, next) {
  console.log("ENTRA exist client?");
  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("verifying client "+ JSON.stringify(newClient.nickName));
  clientLogic.existsClientNickName(newClient.nickName , function(respuesta){
	  	res.send(respuesta);// true, false o error
	    console.log("TERMINA exist client?");
	    res.end();
  });
  
});










//peticiones POST

router.post('/recipeIngredients', function(req, res, next) {
  console.log("ENTRA exist client?");
  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("verifying client "+ JSON.stringify(newClient.nickName));
  clientLogic.existsClientNickName(newClient.nickName , function(respuesta){
      res.send(respuesta);// true, false o error
      console.log("TERMINA exist client?");
      res.end();
  });
  
});


router.post('/addRecipe', function(req, res, next) {
  console.log("ENTRA add recipe");

  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var format = req.body;
  var name = format.nickName;
  var pass = format.password;
  var folder = format.folder;
  var recipe = format.recipe;


  console.log("creando receta: "+ JSON.stringify(format));
  recipeLogic.createRecipe(name, pass, folder, recipe);

  //se asume que nada sale mal guardando entonces crea
  res.send("OK receta agregada");
  console.log("TERMINA add recipe");
  res.end()
  
});


router.post('/createClient', function(req, res, next) {
  console.log("ENTRA createClient");

  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("creating client: "+ JSON.stringify(newClient.nickName));
  clientLogic.createClient(newClient, function (creado){
    //mando esta funcion como callback para que todo sea sincronico
    if(creado)//devuelve boolean
    {
        console.log("paso final, ya se esta creando en paralelo");
        res.send('OK');
    }
    else
    {
      console.log("paso final, no se agrega nada porque nickname repetido");
      res.send('Ocurrio un problema');
    }
    console.log("TERMINA createClient");
    res.end();
  });
});



router.post('/updateClient', function(req, res, next) {
  console.log("ENTRA updateClient");

  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("modifying client: "+ JSON.stringify(newClient.nickName));
  clientLogic.updateClient(newClient, function (creado){
    //mando esta funcion como callback para que todo sea sincronico
    if(creado)//devuelve boolean
    {
        console.log("paso final, ya se esta modificando en paralelo si el password era correcto");
        res.send('MODIFICADO si el password era correcto');
    }
    else
    {
      console.log("paso final, no se agrega nada porque nickname repetido");
      res.send('Ocurrio un problema');
    }
    console.log("TERMINA updateClient");
    res.end();
  });
});




router.post('/deleteClient', function(req, res, next) {
  console.log("ENTRA delete Client");

  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("deleting client: "+ JSON.stringify(newClient.nickName));
  clientLogic.deleteClient(newClient, function (borrado){
    //mando esta funcion como callback para que todo sea sincronico
    if(borrado)//devuelve boolean
    {
        console.log("paso final, ya se esta borrando en paralelo si el password era correcto");
        res.send('BORRADO si el password era correcto');
    }
    else
    {
      console.log("paso final, no se borra porque no hay un registro así");
      res.send('NOT A CLIENT');
    }
    console.log("TERMINA delete Client");
    res.end();
  });
});


module.exports = router;
