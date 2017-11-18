//npm init
//npm install express --save
//npm install swig --save
//npm install mongoose --save
//npm install body-parser --save
//npm install bcrypt--save //NO SE NECESITA
'use strict'
//VARIABLES
// REQUERIMIENTO DE MODULOS
var express = require('express');
var swig = require('swig');
// Requerimiento de mongoose
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//CONFIGURACIONES
// Creación del servidor web con express
var server = express();
// Integracion del motor de templates swig
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });
//Integracion de bodyParser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Importacion de rutas
require('./routers')(server);

// CONFIGURACIONES DB
// Integración de mongoose
mongoose.connect('mongodb://localhost/reto2BackEnd', { useMongoClient: true });
mongoose.Promise = global.Promise


// INICIAR SERVIDOR
// Se corre el servidor en el puerto 8000
server.listen(8000, function () {
    console.log('Servidor esta escuchando en el puerto ' + 8000)
});