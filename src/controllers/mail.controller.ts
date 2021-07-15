import nodemailer from 'nodemailer'
import {Request, Response} from 'express';
import config from '../config';

const mailContact = async (req:Request, res:Response) => {
try{ 
    const {
     name,
     email,
     subject,
     message
 } = req.body

 const mailHTML = `

    <h1>'Nuevo email de Training-TEA'<h1>
    <ul> 
        <li>Nombre: ${name}</li>
        <li>email: ${email}</li>
        <li>asunto: ${subject}</li>
    </ul>
    <p>${message}</p>
    `
const transport = nodemailer.createTransport({
    host: 'smtp.servidor-correo.net',
    port: 25,
    secure: false,
    auth: {
      user: config.mail.email,
      pass: config.mail.pass
    },

    tls: {
        rejectUnauthorized:false
    }
  });

await transport.sendMail({
    from:email,
    to: config.mail.email,
    subject: subject,
    text: message

})
  

res.status(200).json({message: 'Gracias por contactar. Te responderemos lo antes posible.'})

}catch(error){
    return res.status(400).json({message:error.message})
}
}

export default mailContact