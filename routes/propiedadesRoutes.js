import express from 'express';
import { admin, cotiza,cotizar } from '../controllers/propiedadController.js'

const router = express.Router();

router.get('/mis-propiedades', admin)

router.get('/home', cotiza )
router.post('/home', cotizar )

export default router 