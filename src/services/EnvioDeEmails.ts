/**
 * Estrutura de EMAIL
 * {Cliente nome } entra em contato com você solicitando agendamento:
 * ----------------
 * {Serviço}
 * {Data e hora}
 * {Descrição extra se existir}
 * {Botão Para responder}
 * Não responda esse email, é um email automatico;
 */
import nodemailer from "nodemailer";
interface IEmail {
    to: string | string[];
    subject: string;
    text?: string;
    html: string;
}
class Email {
    private user: string | undefined;
    private pass: string | undefined;
    private host: string | undefined;
    private trasporter: any;

    constructor(user: string | undefined, pass: string | undefined, host: string | undefined) {
        this.user = user;
        this.pass = pass;
        this.host = host;
    }
    public init() {
        this.trasporter = nodemailer.createTransport({
            host: this.host,  // ou outro serviço (ex: Outlook, Yahoo)]
            port: 587,
            seucure: false,
            auth: {
                user: this.user, // seu email
                pass: this.pass
            },
            // tls: {
            //     ciphers: 'SSLv3',
            //     rejectUnauthorized: false
            // },
            logger: true
        });
    }
    public mailOptions(destinatario: string, assunto: string, html: string, texto: string = "") {
        return {
            from: this.user,       // endereço de email do remetente
            to: destinatario,    // lista de destinatários
            subject: assunto,       // Assunto
            text: texto, // Texto do e-mail
            html: html // Alternativamente, conteúdo em HTML
        }
    }

    public send(mailOptions: IEmail) {
        this.trasporter.sendMail(mailOptions)
            .then((msg: any) => {
                console.log("Email enviado com sucesso " + msg)
                return true;
            })
            .catch((err: any) => {
                console.log("Falha ao enviar email " + err)
                return false;
            })
    }
}
const host = process.env.SMTP_HOST;
const pass = process.env.SMTP_PASS;
const user = process.env.SMTP_USER;
const email = new Email(user, pass, host);
email.init();
email.send(email.mailOptions("Carlosmaycon443@gmail.com", "Apenas mais um teste qualquer", "<h1>ISSO É UM EMAIL DE TESTE DO FBR DIGITAL</h1>"))


// export const enviar = function (login: string | undefined, pass: string | undefined) {

//     const transporter: any =

//         // Configuração do e-mail (remetente, destinatário, assunto, etc.)
//         let mailOptions = {
//             from: login,       // endereço de email do remetente
//             to: 'carlosmaycon443@gmail.com',    // lista de destinatários
//             subject: 'email de teste',       // Assunto
//             text: 'Conteúdo do email em texto', // Texto do e-mail
//             html: '<b>Conteúdo do email em HTML</b>' // Alternativamente, conteúdo em HTML
//         };

//     transporter.sendMail(mailOptions)
//         .then(() => console.log("Email enviado com sucesso"))
//         .catch((err: any) => console.log("Falha no envio " + err));
// }