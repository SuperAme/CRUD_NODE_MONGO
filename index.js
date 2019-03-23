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
app.get("/carrera",(req,res)=>{
    Carrera.find({}).then(datos => {
        res.send(datos)
    })
})
//5.- Listener(Switch)
app.listen(3002,() => {
    console.log("Conectados al puerto 3002")
})