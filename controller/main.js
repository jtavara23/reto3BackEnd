'use strict'
//REQUERIMIENTOS

var express = require('express');
var router = express.Router();

//Requerimiento de modelo user
var User = require('../models/user');
//Requerimiento de modelo speciality
var amigo = require('../models/amigo');


// Cuando exista una petición en el servidor  
router.route('/').get(function (req, res) {
    User.find()
        .then(
        function (usuarios) {//viene de la BD
            //   console.log("returning " + usuarios);
            res.render('template.html', { users: usuarios });
        }
        )
});


//Creacion de una instancia mediante DIRECCION URL
router.route('/agregar/:nombres/:apellidos/').get(function (req, res) {
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
router.route('/formulario/').get(function (req, res) {

    res.render('formulario.html');

}).post(function (req, res) {
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
        }
        else {
            // Busqueda del usuario elegido
            User.findOne({ apellidos: "Tavara Idrogo", nombres: "Josue Gaston" }).
                then(function (detalle_usu) {
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


//EXPORTACION
module.exports = router;