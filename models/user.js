'use strict'

// Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Definición del esquema
var userSchema = new Schema({
    nombres: { type: String, required: true, unique: true },
    apellidos: { type: String, required: true },
    created: { type: Date, default: Date.now },
    amigos: [
        {
            nombres: { type: String },
            apellidos: { type: String },
            ref: { type: Schema.Types.ObjectId, ref: 'amigo' },

        }
    ]
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('user', userSchema)

