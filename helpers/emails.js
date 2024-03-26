import nodemailer from 'nodemailer'

const emailRegistro = async(datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    const {email, nombre, token} = datos

    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta',
        text: 'Confirma tu cuenta',
        html: `
            <p> Hola ${nombre}, comprueba tu cuenta </p>
            <p> Tu cuenta ya se encuentra lista, solo falta confirmarla en el siguiente enlace:
            <a href = "">Confirmar Cuenta </a> </p>
            <p> Si tu no creaste esta cuenta ignora este mensaje </p>
        `
    })
}

export {
    emailRegistro
}