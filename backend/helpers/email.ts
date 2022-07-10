import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST as string,
  port: parseInt(process.env.EMAIL_PORT as string),
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export async function emailRegistro(datos: any) {
  const { email, name, token } = datos;

  const info = await transport.sendMail({
    from: '"Partikulares" <cuentas@partikulares.com>',
    to: email,
    subject: "Bienvenido a Partikulares",
    text: `Hola ${name}, bienvenido a Partikulares.`,
    html: `
    <p>Hola ${name}, bienvenido a Partikulares. Comprueba tu cuenta ahora!</p>
    
    <p>Tu cuenta ya está casi lista, solo debes comprobarla con el siguiente enlance:</p>
    
    <a href="${process.env.FRONTEND_URL}/user/confirmar/${token}">Confirmar cuenta</a>
    
    <p>Si no has solicitado una cuenta, ignora este correo.</p>`,
  });
}

export async function emailForgotPassword(datos: any) {
  const { email, name, token } = datos;

  const info = await transport.sendMail({
    from: '"Partikulares" <cuentas@partikulares.com>',
    to: email,
    subject: "Partikulares - Restablecer tu password",
    text: `Hola ${name}, restablece tu passwword`,
    html: `
    <p>Hola ${name}, has solicitado reestablecer tu password</p>
    
    <p>Sigue el siguiente enlace para generar un nuevo password:</p>
    
    <a href="${process.env.FRONTEND_URL}/user/olvide-password/${token}">Recuperar cuenta</a>
    
    <p>Si no has solicitado una contraseña nueva, ignora este correo.</p>`,
  });
}
