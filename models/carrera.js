//Importaciones
const mongoose = require('mongoose')
//SCHEMA
const carrerSchema = mongoose.Schema({
    id:{
        type: String
    },
    Titulo:{
        type: String
    },
    semestres:{
        type: Number
    }
})
//Modelo
const Carrera = mongoose.model("carrera",carrerSchema,"carrera")
//Exportar
module.exports = {Carrera}