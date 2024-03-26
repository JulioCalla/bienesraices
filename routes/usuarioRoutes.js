import express from 'express';
import { formularioLogin, formularioRegistro,formularioOlvidePassword,registrar } from '../controllers/usuarioController.js'
//creando la app
const router = express.Router()

//routes
router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)

router.post('/registro', registrar)

router.get('/olvide-password', formularioOlvidePassword)



export default router