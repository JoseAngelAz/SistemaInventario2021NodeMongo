const express = require('express');
const {format} = require('timeagojs');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const db = require('.config/keys').MongoURI;//crear
const morgan = require('morgan');
const multer = require('multer');

//conectar a mongo, esto debe retornar una promesa
mongoose.connect(db,{useNewUrlParser:true})
.then(()=> console.log('MongoDB esta Conectado'))
.catch(err=>console.log(err));

//hacer un servidor basico de express
const app = express();
//requerimos passport de las config
require('./config/passport')(passport);

//EJS motor de plantillas
app.set('view',path.join(__dirname,'views'));
app.set('view engine','ejs');

//modulo de morgan
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
//creando config para almacenar con multer
const almacenamiento = multer.diskStorage({
destination: path.join(__dirname,'public/file/uploads'),
filename:(req,file,cb,filename)=>{
    cb(null,file.originalname);
}
});
//suando multer en app con var de almacenamiento
app.use(multer({storage:almacenamiento}).single('file'));

//formateo de fechas
app.use((req,res,next)=>{
    app.locals.format = format;
    next();
})

//midleware de sesiones de express
app.use(
    session({
        secret:'secret',
        resave:true,
        saveUninitialized:true
    })
);

//passport midleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash para mensajes rapidos
app.use(flash());

//variables globales
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Rutas de la app
app.use('/',require('./routes/index'));