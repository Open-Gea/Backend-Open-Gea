import { randomToken } from "../utils";
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
const YVY_URL = process.env.NODE_ENV ==='local' ? process.env.YVY_URL_LOCAL : process.env.YVY_URL;
const YVY_EMAIL = process.env.YVY_EMAIL;
const YVY_PASSWORD = process.env.YVY_PASSWORD;

export async function emailVerification(email: string, isCoop?: boolean) : Promise<string>{
    let token = randomToken();
    let  splashPageLink = YVY_URL+'#/email-verification?token='+token+'&email='+email;
    if(isCoop) splashPageLink += '&isCoop='+isCoop;
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
        to: email,
        subject: 'YvY- Verificacion de Correo Electrónico',
        html:
          `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>Ayudanos a verificar tu E-Mail</title>
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
                <p>Para verificar este correo electrónico, por favor has click en este boton:</p>
                <a class="button" href="${splashPageLink}" target="_blank">Verificar E-Mail</a>
                <p>Este link expirará en 24 horas.</p>
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
                resolve(info);
            }
        });
    });
  
    return response;
}