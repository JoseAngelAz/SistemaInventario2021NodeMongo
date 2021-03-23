const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//carga el modelo de usuario
const Usuario = require('../models/User');
module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'name'},
        (name,password,done)=>{
        //comparar usuario
        Usuario.findOne({name:name})
        .then(usuario => {
            if (!usuario) {//si no hay usuario
                return done(null,false,{
                    message: 'El usuario no esta registrado'
                });
            }
        //comparar password
        bcrypt.compare(password,usuario.password,(err,isMatch)=>{
            if (err) throw err;
            if (isMatch) {
                return done(null,usuario)
            }else{
                return done(null,false,{
                    message:'Password incorrecto'
                })
            }
        });

        })
        .catch(err => console.log(err));
        })//fin LocalStrategy
    );//fin de passport use

    //serializar usuario
    passport.serializeUser((usuario,done)=>{
        done(null,usuario.id);
    });
    //deserializar usuario
    passport.deserializeUser((id,done)=>{
        Usuario.findById(id,(err,user)=>{
            done(err,user)
        });
    });
}//fin de funcion anonima