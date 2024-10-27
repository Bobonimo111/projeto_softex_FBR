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
    to: String | String[] | undefined;
    subject: String;
    text?: String;
    html: String;
}

class Email {
    private user: String | undefined;
    private pass: String | undefined;
    private host: String | undefined;
    private trasporter: any;

    constructor(user: String | undefined, pass: String | undefined, host: String | undefined) {
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
    public mailOptions(destinatario: String | undefined, assunto: String, html: String, texto: String = "") {
        return {
            from: this.user,       // endereço de email do remetente
            to: destinatario,    // lista de destinatários
            subject: assunto,       // Assunto
            text: texto, // Texto do e-mail
            html: html // Alternativamente, conteúdo em HTML
        }
    }

    public templateNovaRequisicao(provedor: String, servico: String, data: String, hora: String) {
        let htmlTemplate: String =
            `<h1>${provedor} você possui uma nova requisição</h1>
        <hr>
<div>
    <ul>
        <li>Serviço : ${servico} </li>
        <li>Data : ${data} </li>
        <li>Hora : ${hora} </li>
    </ul>
<hr>
<p style="font-size:15px;color:red;">Clique no botão abaixo para confirmar sugerir alterações</p>
<a href=""><button>CONFIRMAR</button></a>
</div>`
        let plainText: String = `${provedor} você possui uma nova requisição, Serviço : ${servico}, Data : ${data}, Hora : ${hora}`

        return {
            htmlTemplate: htmlTemplate,
            plainText: plainText
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

export { Email }


// let email: Email = new Email("MS_FQs8rN@trial-pq3enl6m13rg2vwr.mlsender.net", "9joEW9pkxH7bG0dW", "smtp.mailersend.net")
// email.init();
// let templates = email.templateNovaRequisicao("Pintores", "pintar uma parede", "2024-12-08", "14:30");
// let mailOptions = email.mailOptions("test-8sub5ahwq@srv1.mail-tester.com", "Um Novo serviço", templates.htmlTemplate, templates.plainText);
// email.send(mailOptions);


// export const enviar = function (login: String | undefined, pass: String | undefined) {

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