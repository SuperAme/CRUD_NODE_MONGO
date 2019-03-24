//1.- Importaciones 
//ES5
const express = require('express') 
const mongoose = require('mongoose')
//ES6
//import express from 'express'
//2.- Middlewares
//a.Express
const app = express()
app.use(express.json())
//b.Mongo
mongoose.connect("mongodb://localhost:27017/university",{ useNewUrlParser: true })
//3.- Modelos
const {Estudiante} = require("./models/estudiante.js")
const {Profesor} = require("./models/profesor.js")
const {Carrera} = require("./models/carrera.js")
//4.- Rutas
//http://localhost:3002/estudiantes

//Obtiene todos los estudiantes
app.get("/estudiantes",(req,res) => {
    Estudiante.find({}).then(datos => {
        res.send(datos)
    })
    
})
//UN SOLO ESTUDIANTE
app.get("/estudiantes/Americo",(req,res)=>{
    Estudiante.find({name:"Americo"}).then(datos => {
        res.send(datos)
    })
})

//CREAR ESTUDIANTE
app.post("/estudiantes/nuevo",(req,res)=>{
    //1.-crear estudiante bajo modelo
    const nuevoEstudiante = new Estudiante(req.body)
    //2.-inyectar nuevo estudiante en bd
    //mostrar en postman que se inyecto
    nuevoEstudiante.save((err,docs) => {
        console.log(docs)
        res.send(docs)
    })
})
//FIIN CREAR ESTUDIANTE
//EDITAR ESTUDIANTE
app.post("/estudiantes/:name",(req,res)=>{
    const cambios = req.body
    const nombreBuscado = req.params.name
    Estudiante.update(
        {//query
            name:nombreBuscado
        },
        {//update
            $set: req.body
        },
        (err,doc)=>{//callback
            if(err){
                console.log(err)
            }
            res.send(doc)
        }
    )
})
//FIN EDITAR ESTUDIANTE
//OBTENER ESTUDIANTE POR NOMBRE
app.get("/estudiantes/:name",(req,res) => {

    const nombrebusqueda = req.params.name
    console.log(nombrebusqueda)
    Estudiante.find({name:nombrebusqueda}).then(datos => {
        res.send(datos)
    })
})
//FIN OBTENER ESTUDIANTE POR NOMBRE

//OBTENER TODOS LOS PROFESORES
app.get("/profesores",(req,res)=>{
    Profesor.find({}).then(datos => {
        res.send(datos)
    })
})
//FIN OBTENER TODOS LOS PROFESORES

//OBTENER UN SOLO PROFESOR POR NOMBRE
app.get("/profesores/:name",(req,res) => {
    const profBusqueda = req.params.name
    Profesor.find({name:profBusqueda}).then(datos => {
        res.send(datos)
    })
})
// FIN OBTENER UN SOLO PROFESOR

//CREAR PROFESOR
app.post("/profesores/nuevo",(req,res)=>{
    const nuevoProfesor = new Profesor(req.body)
    nuevoProfesor.save((err,docs) => {
        res.send(docs)
    })
})
//FIN CREAR PROFESOR

//EDITAR PROFESOR
app.post("/profesores/:name",(req,res)=>{
    const editar = req.body
    const profBuscado = req.params.name
    Profesor.update(
        {
            name:profBuscado
        },
        {
            $set: req.body
        },
        (err,doc)=>{
            if(err){
                console.log(err)
            }
            res.send(doc)
        }
    )
})
//FIN EDITAR PROFESOR

//OBTENER CARRERAS
app.get("/carrera",(req,res)=>{
    Carrera.find({}).then(datos => {
        res.send(datos)
    })
})
// FIN OBTENER CARRERAS
//UNA SOLA CARRERA
app.get("/carrera/:Titulo",(req,res) => {
    const careerBusqueda = req.params.Titulo
    Carrera.find({Titulo:careerBusqueda}).then(datos => {
        res.send(datos)
    })
})
//FIN UNA SOLA CARRERA
//CREAR CARRERA
app.post("/carrera/nuevo",(req,res)=>{
    const nuevaCarrera = new Carrera(req.body)
    nuevaCarrera.save((err,docs) => {
        res.send(docs)
    })
})
//FIN CREAR CARRERA
//5.- Listener(Switch)
app.listen(3002,() => {
    console.log("Conectados al puerto 3002")
})