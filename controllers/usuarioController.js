import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from '../helpers/tokens.js'
import { emailRegistro } from '../helpers/emails.js'

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina: "Iniciar Sesión",
    });
};

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        pagina: "Crear Cuenta",
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

const formularioOlvidePassword = (req, res) => {
    res.render("auth/olvide-password", {
        pagina: "Recuperar Cuenta",
    });
};

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar,
};
