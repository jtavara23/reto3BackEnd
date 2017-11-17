'use strict'

// Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Definición del esquema
var amigoSchema = new Schema({
    nombres: { type: String},
    apellidos: { type: String },
    created: { type: Date, default: Date.now },
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('amigo', amigoSchema)