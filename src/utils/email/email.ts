import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { User } from '../../models/user/user';
import { randomToken  } from '../utils';

const YVY_EMAIL = process.env.YVY_EMAIL;
const YVY_PASSWORD = process.env.YVY_PASSWORD;
const WF_RESET_PASSWORD_LINK = process.env.NODE_ENV ==='local' ? process.env.GEA_URL_LOCAL : process.env.YVY_URL;

export async function forgotPasswordEmail(user: User): Promise<string | Error> {
  let token = randomToken();
  
  const  resetLink = WF_RESET_PASSWORD_LINK+'#/password-recovery?token='+token

  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: YVY_EMAIL,
      pass: YVY_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  const mailOptions: Mail.Options = {
    from: YVY_EMAIL,
    to: user.email,
    subject: 'YvY Reiniciar Contraseña',
    html:
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Reincia tu contraseña</title>
          <style>
          .card {
            border-radius: 10px;
            box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
            margin: 20px 0;
            padding: 20px;
          }
    
          .button {
            background-color: #00c853;
            border-radius: 5px;
            color: #ffffff;
            display: inline-block;
            font-size: 16px;
            padding: 10px 20px;
            text-decoration: none;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); 
            transition: all 0.2s ease-in-out; 
            }
            
            .button:hover,
            .button:focus {
            background-color: #009624;
            cursor: pointer;
            outline: none;
            }
    
          h1 {
            text-align: center;
          }
      
            h1 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Reinicia tu contraseña</h1>
            <p>¡Hola ${user.name}!,</p>
            <p>Estas recibiendo este email para reinciar tu contraseña. Si tu no hiciste esta petición, por favor ignora este email.</p>
            <p>Para reinciar tu contraseña, por favor has click en este boton:</p>
            <a class="button" href="${resetLink}">Reinciar Contraseña</a>
            <p>Este link expirará en 1 hora.</p>
            <p>Si tienes alguna duda o comentario, por favor contactanos a ${YVY_EMAIL}.</p>
            <p>Muchas Gracias,</p>
            <p>YvY Team</p>
          </div>
        </body>
      </html>
      `
  }
  let response: string | Error = token;

  await new Promise((resolve, reject) => {
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
            response = err;
        } else {
            console.log(info);
            console.log('Email sent: ' + info.response);
            resolve(info);
        }
    });
});
  return response;

}
