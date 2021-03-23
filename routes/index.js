const express = require('express');
const router = express.Router();
const {asegurarAutenticacion} = require('../config/auth');
const Articulos = require('../models/articulo');
let errores = []

//Ruta para Index con GET
router.get('/index',asegurarAutenticacion,(req,res)=>{
    try {
        Articulos.find({"cantidad":{$lt:6}},(err,articulos))=>{
            console.log(articulos)
            if (articulos) {
                
            }
        } 
    } catch (error) {
        
    }
})



module.exports = router;