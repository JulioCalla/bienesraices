import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

//creando la app
const app = express()

//conexion db
try {
    await db.authenticate();
    console.log('Conexion correcta a la db')
} catch (error) {
    console.log(error)
}

//habilitar pug
app.set('view engine', 'pug')
app.set('views', './views')

app.use( express.static('public'))

app.use('/auth', usuarioRoutes)

//definiendo puerto
const port = 3000;
app.listen (port, () => {
    console.log("El servidor corriendo en el puerto " + port)
});
