//1.- Importaciones
const mongoose = require('mongoose') 
//2.- SCHEMA / ESQUEMA
const estudianteSchema = mongoose.Schema({
    id:{
        type: String
    },
    name:{
        type: String
    },
    average:{
        type: Number
    }

})
//3.- Creacion del Modelo
//mongoose.model("nombre modelo en singular",schema de arriba,"nombre de la coleccion")
const Estudiante = mongoose.model("estudiante",estudianteSchema,"estudiantes")
//4.- Exportaciones
module.exports = {Estudiante}