import nodemailer from 'nodemailer'
import { MailAdaper, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d2cab5f44cc054",
      pass: "bb051a74e04664"
    }
});

export class NodemailerAdapter implements MailAdaper {
    async sendMail({subject,body}: SendMailData){
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Davy de Souza Assunção <davydesouzabar@gmail.com>',
            subject,
            html:body,
    })
    }
}