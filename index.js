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
//EDIT ESTUDIANTE
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
//FIN EDIT ESTUDIANTE

app.get("/estudiantes/:name",(req,res) => {

    const nombrebusqueda = req.params.name
    console.log(nombrebusqueda)
    Estudiante.find({name:nombrebusqueda}).then(datos => {
        res.send(datos)
    })
})
app.get("/profesores",(req,res)=>{
    Profesor.find({}).then(datos => {
        res.send(datos)
    })
})
//UN SOLO PROFESOR
app.get("/profesores/:name",(req,res) => {
    const profBusqueda = req.params.name
    Profesor.find({name:profBusqueda}).then(datos => {
        res.send(datos)
    })
})
//FIN PROFESOR
//CREAR PROFESOR
app.post("/profesores/nuevo",(req,res)=>{
    const nuevoProfesor = new Profesor(req.body)
    nuevoProfesor.save((err,docs) => {
        res.send(docs)
    })
})
//FIN PROFESOR
app.get("/carrera",(req,res)=>{
    Carrera.find({}).then(datos => {
        res.send(datos)
    })
})
//UNA SOLA CARRERA
app.get("/carrera/:Titulo",(req,res) => {
    const careerBusqueda = req.params.Titulo
    Carrera.find({Titulo:careerBusqueda}).then(datos => {
        res.send(datos)
    })
})
//FIN CARRERA
//CREAR CARRERA
app.post("/carrera/nuevo",(req,res)=>{
    const nuevaCarrera = new Carrera(req.body)
    nuevaCarrera.save((err,docs) => {
        res.send(docs)
    })
})
//FIN CARRERA
//5.- Listener(Switch)
app.listen(3002,() => {
    console.log("Conectados al puerto 3002")
})