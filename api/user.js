'use strict'
//REQUERIMIENTOS

var express = require('express');
var router = express.Router();

//Requerimiento de modelo speciality
var amigo = require('../models/amigo');
//Requerimiento de modelo user
var User = require('../models/user');

//OPERACIONES

// READ
//   http://localhost:8000/api/Gaston
router.route('/:nombre')
    .get(function (req, res) {
        // Obtener toda la coleccion specialities
        //Speciality.find()
        var nombreDado = req.params.nombre;// Obtencion de parametros de url
        // Busqueda de resgitro particular
        //Search for Josue Gaston
        User.findOne({ nombres: { $regex: ".*"+nombreDado+".*" } } )
            .then(function (detalles) {
                var retornar = {
                    nombres: detalles.nombres,
                    apellidos: detalles.apellidos
                }
                // Servir coleccion  
                res.json(retornar);
            })
    });
//UPDATE PUT
// http://localhost:8000/api/Gaston
router.route('/:nombre')
    .put(function (req, res) {
        // Obtencion de parametros de url
        var nombreDado = req.params.nombre;
        // Obtencion de variables del body
        var new_nombre = req.body.nombres;
        var new_apellidos = req.body.apellidos;
        // Busqueda del registro por su nombre unico
        //Search for Josue Gaston
        User.findOne({ nombres: { $regex: ".*" + nombreDado + ".*" } })
            .then(function (detalles) {
                // Si hay actualizacion en el nombre
                if (new_nombre) {
                    // Remmplazamos el anterior varlor por el nuevo
                    detalles.nombre = new_nombre;
                }
                // Si hay actualizacion en la imagen 
                if (new_apellidos) {
                    // Remmplazamos el anterior varlor por el nuevo
                    detalles.apellidos = new_apellidos;
                }
                // Almacenamiento del registro en la base de datos
                detalles.save(function (err) {
                    if (err) {
                        // Si hay un error al momento de guardar el registro 
                        //nos muestra succes:false y cual fue el error 
                        console.log(err);
                        res.json({ success: false, error: err });
                    } else {
                        // Si el registro se completo sin errores 
                        // nos devuelve succes:true y el registro creado
                        res.json({ success: true, detalles: detalles })
                    }
                })
            })
    });


//EXPORTACION
module.exports = router;