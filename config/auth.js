module.exports = {
    asegurarAutenticacion:(req,res,next)=>{
        if (req.estaAutenticado()) {
            return next();
        }else{
            req.flash('error_msg','por favor inicia sesion');
            res.redirect('/users/login');
        }
    }
}