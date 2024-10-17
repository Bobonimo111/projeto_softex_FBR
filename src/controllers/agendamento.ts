import { Request, Response } from "express";
import { Email } from "../services/Email";
import clienteModel from "../models/clientes"
import provedorModel from "../models/provedores"
import ServicoModel from "../models/provedorServico"
/**
 * Rota para criar novo agendamento post 
 * Rota para editar agendamento put
 * Rota para cancelar agendamento delete
 */
/**
 * Serviço_id
 * cliente_id
 * provedro_id
 * data
 * hora
 * status
 */


const solicitarNovoAgendamento = (req: Request, res: Response) => {
    const requisicao = {
        time: req.body.time,
        date: req.body.date,
        descricao: req.body.descricao,
        service_id: req.body.service_id,
        cliente_id: req.body.cliente_id
    }
    //Conferir se todos os campos estão preenchidos
    Object.keys(requisicao).forEach((value) => {
        //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
        if (requisicao[value] == undefined || requisicao[value] == "" && value != "descricao") {
            res.setHeader("content-type", "application/json")
            res.send({ msg: "Not make requisition, " + value + " is undefined" }).status(406);
        }
    })
    //busca o modelo do cliente por id
    clienteModel.findByPk(requisicao.cliente_id).then(clienteObject => {
        //busca o modelo do servico por id
        ServicoModel.findByPk(requisicao.service_id).then(servicoObject => {
            //busca o modelo do provedor por id
            provedorModel.findByPk(servicoObject.provedor_id).then(provedorObject => {
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
                let template: string = `
            <h1>${clienteObject.name} entra em contato solicitando agendamento</h1>
            <hr>
            <p>
                Serviço :${servicoObject.name}
                Data: ${requisicao.date}
                Hora: ${requisicao.time}
                Descrição:${requisicao.descricao != undefined ? requisicao.descricao : ""}
                <form method="GET">
                    <input type="submit" value="RESPONDER">
                </form>
                <hr>
            </p>
                                   `;
                const host = process.env.SMTP_HOST;
                const pass = process.env.SMTP_PASS;
                const user = process.env.SMTP_USER;
                const email = new Email(user, pass, host);
                email.init();
                email.send(email.mailOptions(provedorObject?.email, "Ocorreu um erro na visualização", template))
                res.send({ msg: requisicao }).status(200);

            })
        })
    })
}
//NOTA: ESSA CAMPO DEVE RECEBER UM ID
//ESSE ID É REFERENTE AO AGEDAMENTO, ESSE ID DEVE VIR POR MEIO DE QUERRY
//SE NADA TUDO QUE VIER POR MEIO DO BODY FOR IGUAL AO ID DO AGENDAMENTO
//O STATUS DO AGENDAMENTO DEVE SER MODIFICADO PARA APROVADO ENVIANDO UM EMAIL PARA O
//CLIENTE QUE FEZ A REQUISIÇÃO.
const modificarAgendamento = (req: Request, res: Response) => {

}

const cancelarAgendamento = (req: Request, res: Response) => {

}
//TEste de envio de emails
// app.get("/emailTest", (req: Request, res: Response) => {
//     const host = process.env.SMTP_HOST;
//     const pass = process.env.SMTP_PASS;
//     const user = process.env.SMTP_USER;
//     console.log("host: " + host)
//     const email = new Email(user, pass, host);
//     email.init();
//     email.send(email.mailOptions("Carlosmaycon443@gmail.com", "Apenas mais um teste qualquer", "<h1>ISSO É UM EMAIL DE TESTE DO FBR DIGITAL</h1>"))
// })

export { solicitarNovoAgendamento, modificarAgendamento, cancelarAgendamento };