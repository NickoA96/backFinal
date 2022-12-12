const mongoose = require('mongoose');
const {Schema} = require('mongoose');;

const personaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: new Date()
    }

    
});

const Persona = mongoose.model('Persona', personaSchema);

module.exports = Persona;
