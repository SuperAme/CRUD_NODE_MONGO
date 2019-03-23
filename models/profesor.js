//Importaciones
const mongoose = require("mongoose")
//SCHEMA
const profeSchema = mongoose.Schema({
    id:{
        type: String
    },
    name:{
        type: String
    },
    career:{
        type: String
    }
})
//Creacion del Modelo
const Profesor = mongoose.model("profesor",profeSchema,"profesores")
//Exportaciones
module.exports = {Profesor}