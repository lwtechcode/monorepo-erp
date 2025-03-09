import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export async function sendMail({
  name,
  address,
  code,
  path,
  subject,
  host,
}: {
  name: string;
  address: string;
  code: string;
  path: string;
  subject: string;
  host: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testeprogramacao2024@gmail.com',
        pass: 'dzesfusgzdybppsp',
      },
    });

    const mailOptions = {
      from: {
        name: 'Equipe do Sistema',
        address: 'engwesleybruno@gmail.com',
      },
      to: address,
      subject,
      html: `
       <html>
           <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #4CAF50; padding: 20px; color: white; text-align: center;">
                    <h2 style="font-size: 24px; margin: 0;">Bem-vindo(a) ao nosso sistema, ${name}!</h2>
                </div>
                
                <div style="padding: 20px;">
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">Obrigado por se cadastrar em nosso sistema! Para concluir seu cadastro e validar seu e-mail, basta clicar no botão abaixo:</p>
                    
                    <a href="${host}/${path}/${code}" 
                    style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px; margin-top: 20px;">
                    Verificar meu e-mail
                    </a>

                    <p style="font-size: 14px; color: #777; margin-top: 20px;">Se você não se inscreveu em nosso sistema, por favor, ignore este e-mail.</p>
                </div>

                <div style="background-color: #f7f7f7; padding: 10px; text-align: center;">
                    <footer style="font-size: 12px; color: #aaa;">
                    <p>Equipe de Suporte - Sistema</p>
                    <p>Este é um e-mail automático. Por favor, não responda.</p>
                    </footer>
                </div>
                </div>
            </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error('Erro ao enviar o email de validação');
  }
}
