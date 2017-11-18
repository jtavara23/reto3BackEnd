'use strict'
//REQUERIMIENTOS

var express = require('express');
var router = express.Router();

//Requerimiento de modelo user
var User = require('../models/user');
//Requerimiento de modelo speciality
var Amigo = require('../models/amigo');

// READ
//   http://localhost:8000/api/amigos
router.route('/amigos')
    .get(function (req, res) {
        // Busqueda de resgitro particular
        User.findOne({ nombres: "Josue Gaston" })
            .then(function (detalles) {
                // Servir coleccion  
                res.json(detalles.amigos);
            })
    });

//ADD AMIGOS
router.route('/amigos')
    .post(function (req, res) {
        var nombres = req.body.nombres;
        var apellidos = req.body.apellidos;

        var nuevo = new Amigo({
            nombres: nombres,
            apellidos: apellidos
        })
        
        nuevo.save(function (err) {
            if(err){
                console.log(err);
                res.json({ success: false, error: err });
            } else {
                // Busqueda de resgitro particular
                User.findOne({ nombres: "Josue Gaston" })
                    .then(function (detalles) {
                        detalles.amigos.push({
                            nombres: nuevo.nombres,
                            apellidos: nuevo.apellidos,
                            ref: nuevo._id
                        })
                        detalles.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.json({ success: false, error: err });
                            } else {
                                res.json({ success: true, amigo: nuevo });
                            }        
                        })
                    })
            }
        })
        
    });

// READ/GET special friend
//   http://localhost:8000/api/Nombre Apellido
router.route('/amigos/:datosAmigo')
    .get(function (req, res) {
        // Obtencion de parametros de url
        var datos = req.params.datosAmigo;
        var datosDetalle = datos.split(' ');
        //console.log(datosDetalle);
        // Busqueda de resgitro particular
        Amigo.findOne({
            nombres: { $regex: ".*" + datosDetalle[0] + ".*" }, 
            apellidos: { $regex: ".*" + datosDetalle[1] + ".*" }}, 
            function (err, result) {
                if (err)   console.log(err);
                if (result) {
                    console.log("se encontro");
                    res.json(result);
                } else {
                    console.log("No se encontro");
                }
            }
        )

    });



//UPDATE/PUT special friend
//   http://localhost:8000/api/Nombre Apellido
router.route('/amigos/:datosAmigo')
    .put(function (req, res) {
        // Obtencion de parametros de url
        var datos = req.params.datosAmigo;
        var datosDetalle = datos.split(' ');
        //console.log(datosDetalle);
        var new_nombres = req.body.nombres;
        var new_apellidos = req.body.apellidos;
        
        // Busqueda de resgitro particular
        Amigo.findOne({
            nombres: { $regex: ".*" + datosDetalle[0] + ".*" },
            apellidos: { $regex: ".*" + datosDetalle[1] + ".*" }},
            function (err, result) {
                if (err) { // handle err 
                    console.log(err);
                }
                if (result) {
                    //console.log("se encontro"+result);
                    //actualizar(new_nombres, new_apellidos, result, res);
                    var old_names= result.nombres;
                    var old_lastNames = result.apellidos;
                    if (new_nombres) {
                        // Remmplazamos el anterior varlor por el nuevo
                        result.nombres = new_nombres;
                    }
                    // Si hay actualizacion en la imagen 
                    if (new_apellidos) {
                        // Remmplazamos el anterior varlor por el nuevo
                        result.apellidos = new_apellidos;
                    }

                    User.findOne({ nombres: "Josue Gaston" })
                        .then(function (detalles) {
                            var amigoEditar = detalles.amigos.find(function (person) {
                            return (person.apellidos == old_lastNames,person.nombres == old_names );
                            });
                            //console.log("eliminar a " + amigoEditar);
                            amigoEditar.remove();
                            detalles.amigos.push({
                                nombres: result.nombres,
                                apellidos: result.apellidos,
                                ref: result._id
                            })
                            detalles.save(function (err) {
                                if (err) {
                                    console.log(err);
                                    res.json({ success: false, error: err });
                                } else {
                                    // Almacenamiento del registro en la base de datos
                                    result.save(function (err) {
                                        if (err) {
                                            console.log(err);
                                            res.json({ success: false, error: err });
                                        } else {
                                            // Si el registro se completo sin errores 
                                            // nos devuelve succes:true y el registro creado
                                            res.json({ success: true, resultado: result });
                                        }
                                    })
                                }
                            })
                        })
                    
                }
                else {
                    console.log("No se encontro");
                }
            }
        )

    });


//EXPORTACION
module.exports = router;