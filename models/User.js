const mongoose = require(mongoose);

//esquema del usuario

const UsuarioSchema = new mongoose.Scchema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Usuario = mongoose.model('Usuario',UsuarioSchema);
module.exports = Usuario;