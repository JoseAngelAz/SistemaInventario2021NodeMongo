const mongoose = require('mongoose');
const valorunico = require('mongoose-unique-validator');

//creando esquema del articulo
let Schema = mongoose.Schema;

let articuloSchema = new Schema({
    nombre:{
        type:String
    },
    modelo:{
        type:String
    },
    categoria:{
        type:String
    },
    cantidad:{
        type:Number
    },
    peso:{
        type:String
    },
    proveedor:{
        type:String
    },
    ubicacion:{
        type:String
    },
    disponible:{
        type:Boolean,
        default:true
    },
    filename:{type:String},
    path:{type:String},
    originalname:{type:String},
    mimetype:{type:String},
    size:{type:Number},
    created_at:{type:Date,default:Date.now()}
})

articuloSchema.plugin(valorunico,{
    message:'{PATH} Debe ser unico y detergente.'
})

module.exports = mongoose.model('Articulo',articuloSchema);