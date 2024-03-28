import nodemailer from 'nodemailer'

const emailRegistro = async(datos) => {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    const {email, nombre, token} = datos

    let mail= {
        from: '',
        to: email,
        subject: 'Confirma tu cuenta',
        text: 'Confirma tu cuenta',
        html: `
            <p> Hola ${nombre}, comprueba tu cuenta </p>
            <p> Tu cuenta ya se encuentra lista, solo falta confirmarla en el siguiente enlace:
            <a href = "${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta </a> </p>
            <p> Si tu no creaste esta cuenta ignora este mensaje </p>
        `
    }
    transport.sendMail(mail, (error, info) => {
        if(error) {
            console.error("Error sending email: ", error);
        }//end if
        else {
            console.log("Email sent.");
        }//end else
    })
    /*await transport.sendMail({
        from: '',
        to: 'rekip56082@shaflyn.com',
        subject: 'Confirma tu cuenta',
        text: 'Confirma tu cuenta',
        html: `
            <p> Hola ${nombre}, comprueba tu cuenta </p>
            <p> Tu cuenta ya se encuentra lista, solo falta confirmarla en el siguiente enlace:
            <a href = "${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta </a> </p>
            <p> Si tu no creaste esta cuenta ignora este mensaje </p>
        `
    })*/
}

const emailOlvidePassword = async(datos) => {
    /*const transport = nodemailer.createTransport({
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
        subject: 'Restablecer password en BienesRaices',
        text: 'Restablecer password en BienesRaices',
        html: `
            <p> Hola ${nombre}, has solicitado reestablecer tu password. </p>
            <p> Sigue el enlace para establecer un password nuevo:
            <a href = "${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Reestablecer Password </a> </p>
            <p> Si tu no solicitaste el cambio, ignora este mensaje </p>
        `
    })*/

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    const {email, nombre, token} = datos

    let mail= {
        from: '',
        to: email,
        subject: 'Restablecer password',
        text: 'Restablecer password',
        html: `
            <p> Hola ${nombre}, has solicitado reestablecer tu password. </p>
            <p> Sigue el enlace para establecer un password nuevo:
            <a href = "${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Reestablecer Password </a> </p>
            <p> Si tu no solicitaste el cambio, ignora este mensaje </p>
        `
    }
    transport.sendMail(mail, (error, info) => {
        if(error) {
            console.error("Error sending email: ", error);
        }//end if
        else {
            console.log("Email sent.");
        }//end else
    })

}

export {
    emailRegistro,
    emailOlvidePassword
}