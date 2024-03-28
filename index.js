import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

//creando la app
const app = express()

//habilitando la lectura de los datos q enviaremos desde el formulario
app.use(express.urlencoded({extended: true}))

//habilitar cookieparser
app.use(cookieParser())

//habilitar el csrf
app.use(csrf({cookie: true}))


//conexion db
try {
    await db.authenticate();
    db.sync()
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
const port = process.env.PORT || 3000; 
app.listen (port, () => {
    console.log("El servidor corriendo en el puerto " + port)
});
