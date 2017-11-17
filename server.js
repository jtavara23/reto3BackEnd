//npm init
//npm install express --save
//npm install swig --save
//npm install mongoose --save
//npm install body-parser --save
//npm install bcrypt--save
'use strict'
//VARIABLES
/*
var persona = {
    nombres: "Josue Gaston",
    apellidos: "Tavara Idrogo"
}
*/
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


// CONFIGURACIONES DB
// Integración de mongoose
mongoose.connect('mongodb://localhost/reto2BackEnd', { useMongoClient: true });
mongoose.Promise = global.Promise
// Requerimiento de modelo speciality
var User = require('./models/user');
var Amigo = require('./models/amigo');


// PETICIONES
// Cuando exista una petición en el servidor  
server.get('/', function (req, res) {
    User.find()
        .then(
        function (usuarios) {//viene de la BD
            //   console.log("returning " + usuarios);
            res.render('template.html', { users: usuarios });
        }
        )
});

//Creacion de una instancia mediante DIRECCION URL
server.get('/agregar/:nombres/:apellidos/', function (req, res) {
    //Obtencion de parametros de url
    var nombres = req.params.nombres;
    var apellidos = req.params.apellidos;
    //Crear una instancia del modelo usuario
    var user = new User({ nombres: nombres, apellidos: apellidos })
    //Guardar instancia del modelo
    user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            // Redireccion a home
            res.redirect('/');
        }
    });
});

//GET THE FORMULARIO
server.get('/formulario/', function (req, res) {

    res.render('formulario.html');

});


server.post('/formulario/', function (req, res) {
    //console.log("Post APELLIDO "+req.body.apellidos); //imprimir en consola
    // Regitro de informacion del formulario
    var nombres = req.body.nombres;
    var apellidos = req.body.apellidos;
    var amigo = new Amigo({
        nombres: nombres,
        apellidos: apellidos
    });
    amigo.save(function (err) {
        // Aseguramiento de no errores
        if (err) {
            console.log(err);
        } else {
            // Busqueda del usuario elegido
            User.findOne({ apellidos: "Tavara Idrogo", nombres: "Josue Gaston" }).then(function (detalle_usu) {
                detalle_usu.amigos.push({
                    nombres: amigo.nombres,
                    apellidos: amigo.apellidos,
                    ref: amigo._id
                });
                // Guardar los cambios hechos en la especialidad
                detalle_usu.save(function (err) {
                    // Aseguramiento de no errores
                    if (err) {
                        console.log(err);
                    } else {
                        // Redireccion a home
                        res.redirect('/');
                    }
                });
            });
        }
    })
});



// INICIAR SERVIDOR
// Se corre el servidor en el puerto 8000
server.listen(8000, function () {
    console.log('Servidor esta escuchando en el puerto ' + 8000)
});