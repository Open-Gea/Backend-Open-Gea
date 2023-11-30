import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


const YVY_EMAIL = process.env.YVY_EMAIL;
const YVY_PASSWORD = process.env.YVY_PASSWORD;


export async function contactEmail(email,body: any): Promise<string | Error> {

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
  
  const mailOptionsYvY: Mail.Options = {
    from: YVY_EMAIL,
    to: YVY_EMAIL, //auto send email to keep the contact
    subject: 'YvY - Nuevo Contacto de YvY App',
    html:
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Contacto de YvY</title>
        </head>
        <body>
          <div class="card">
            <h1>Mensaje de contacto exitoso</h1>
            <p>Auto mensaje de YvY App</p>
            <p>La información brindada fue la siguiente:</p>
            <p>Nombre : ${body.name}</p>
            <p>Email : ${email}</p>
            <p>País : ${body.country}</p>
            <p>Mensaje:</p>
            <p><strong>${body.message}</strong></p>
            <h2>Equipo YvY</h2>
          </div>
        </body>
      </html>
      `
  }

  const mailOptions: Mail.Options = {
    from: YVY_EMAIL,
    to: email,
    subject: 'YvY - Nuevo Contacto de YvY App (Copia)',
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Contacto de YvY</title>
      <style>
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
        <h1>Mensaje de contacto exitoso</h1>
        <p>Estas recibiendo este email para confirmar el inicio de tu contacto con YvY Team. Si tu no hiciste esta petición, por favor ignora este email.</p>
        <p>La información brindada fue la siguiente:</p>
        <p>Nombre : ${body.name}</p>
        <p>Email : ${email}</p>
        <p>País : ${body.country}</p>
        <p>Mensaje:</p>
        <p><strong>${body.message}</strong></p>
        <h3>¡Muchas gracias por tu mensaje!</h3>
        <p>Pronto nos pondremos en contacto</p>
        <h2>Equipo YvY</h2>
      </div>
    </body>
  </html>
    `,
  };
  let response: string | Error = 'Contact message sent';

  try {

    const recipientInfo = await transporter.sendMail(mailOptions);
    console.log('Email sent to recipient: ' + recipientInfo.response);

    const yvyInfo = await transporter.sendMail(mailOptionsYvY);
    console.log('Email sent to YVY_EMAIL: ' + yvyInfo.response);
  } catch (err) {
    console.error(err);
    response = err;
  }

  return response;
}


