import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from '../helpers/tokens.js'
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js'

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina: "Iniciar Sesión",
    });
};

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        pagina: "Crear Cuenta",
        csrfToken: req.csrfToken()
    });
};

const registrar = async (req, res) => {
    //validar los datos
    await check("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .run(req);
    await check("email")
        .isEmail()
        .withMessage("Ingresar un email valido")
        .run(req);
    await check("password")
        .isLength({ min: 6 })
        .withMessage("El password debe ser de al menos 6 caracteres")
        .run(req);

    let resultado = validationResult(req);

    //return res.json(resultado.array())
    if (!resultado.isEmpty()) {
        return res.render("auth/registro", {
            pagina: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }

    const {nombre, email, password} = req.body

    const existeUsuario = await Usuario.findOne({ where: {email}})
    if(existeUsuario){
        return res.render("auth/registro", {
            pagina: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario ya esta registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }

    //crea el usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    });

    //enviar email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })
    //Mensaje de confirmacion de creacion de cuentaaaaa
    res.render('templates/mensaje',{
        pagina: 'Cuenta Creada Satisfactoriamente',
        mensaje: 'Validar el correo, se envio un mensaje de confirmacion.'
    })
};

const confirmar = async(req,res) =>{
    const {token} = req.params;
    //validar si el token es incorrecto
    const usuario = await Usuario.findOne({ where: {token} })
    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo.',
            error: true
        })
    }
    //validar si el token es incorrecto
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();
    res.render('auth/confirmar-cuenta',{
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmo correctamente'
    })
}

const formularioOlvidePassword = (req, res) => {
    res.render("auth/olvide-password", {
        pagina: "Recuperar Cuenta",
        csrfToken: req.csrfToken()
    });
};

const resetPassword = async(req, res) => {
    //validar los datos
    await check("email")
        .isEmail()
        .withMessage("Ingresar un email valido")
        .run(req);

    let resultado = validationResult(req);
    if (!resultado.isEmpty()) {
        return res.render("auth/olvide-password", {
            pagina: "Recupera tu cuenta",
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        });
    }

    //buscar al usuario
    const { email } = req.body
    const usuario = await Usuario.findOne({where: { email }}) 
    if (!usuario){
        return res.render("auth/olvide-password", {
            pagina: "Recupera tu cuenta",
            csrfToken: req.csrfToken(),
            errores: [{msg: "El email no pertenece a ningun usuario."}],
        });
    }

    //GENERAR TOKEN Y ENVIAR UN EMAIL
    usuario.token = generarId();
    await usuario.save();

    //enviar un email 
    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    })
    res.render('templates/mensaje',{
        pagina: 'Reestablece tu password',
        mensaje: 'Se envio un email con las instrucciones'
    })

};

const comprobarToken = async(req, res) => {
    const {token} = req.params;

    const usuario = await Usuario.findOne({ where: {token}})

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Reestablecer Password',
            mensaje: 'Hubo un error al validar informacion.',
            error: true
        })
    }

    res.render('auth/reset-password',{
        pagina: 'Reestablecer Password',
        csrfToken: req.csrfToken()
    })

}

const nuevoPassword = (req, res) => {
    console.log('Guardando Password ')
} 

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar,
    confirmar,
    resetPassword,
    comprobarToken,
    nuevoPassword,
};
