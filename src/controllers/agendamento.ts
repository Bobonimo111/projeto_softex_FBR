import { Request, Response } from "express";
import { Email } from "../services/Email";
import clienteModel from "../models/Cliente"
import userModel from "../models/User"
import provedorModel from "../models/Provedor"
import ServicoModel from "../models/Servico"
import agendamentoModel from "../models/Agendamento"
import ProvedorServicoModel from "../models/ProvedorServico";
// import axios from "axios";
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


const solicitarNovoAgendamento = async (req: Request, res: Response) => {
    try {
        let requisicao = {
            servicoId: req.body.servicoId,
            clienteId: req.body.clienteId,
            status: "pendente"
        }
        console.log(requisicao)
        //Conferir se todos os campos estão preenchidos
        Object.keys(requisicao).forEach((value) => {
            //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
            if (requisicao[value] == undefined || requisicao[value] == "") {
                res.setHeader("content-type", "application/json")
                res.send({ msg: "Not make requisition, " + value + " is undefined" }).status(406);
            }
        })
        const servicoIntermediario = await ProvedorServicoModel.findOne({ where: { servicoId: requisicao.servicoId } });
        const provedor = await provedorModel.findByPk(servicoIntermediario?.provedorId);
        const provedorUser = await userModel.findByPk(provedor?.userId);
        const cliente = await clienteModel.findByPk(requisicao.clienteId);
        const clienteUser = await userModel.findByPk(cliente?.userId);
        const servico = await ServicoModel.findByPk(requisicao.servicoId);
        requisicao["provedorId"] = servicoIntermediario?.provedorId;
        console.log(requisicao)
        agendamentoModel.create(requisicao).then(agendamentoDataRequest => {
            if (agendamentoDataRequest == undefined) {
                //Retorno de erro e invalida o agendamento
            } else {
                let email: Email = new Email(process.env.SMTP_USER, process.env.SMTP_PASS, process.env.SMTP_HOST);
                email.init()
                let templates = email.templateNovaRequisicao(provedorUser?.nome, servico?.nome, agendamentoDataRequest.data, agendamentoDataRequest.hora);
                let mailOptions = email.mailOptions(provedorUser?.email, "AGENDAMENTO DE SERVIÇO", templates.htmlTemplate, templates.plainText);
                email.send(mailOptions);
                res.send("OK agendametno realizado").status(200);
            }
        }).catch(err => {
            res.setHeader("content-type", "application/json");
            res.send({ msg: err }).status(500);
        })
    }
    catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: err }).status(500);
    }
}
//NOTA: ESSA CAMPO DEVE RECEBER UM ID
//ESSA ROTA DEVE SER ACESSADA APENAS POR UMA ROTA DE RESPOSTA
//ESSA PAGINA DEVE CONTER O ID DO AGENDAMENTO, PARA CARREGAR O MESMO
const modificarAgendamento = (req: Request, res: Response) => {
    const requisicao = {
        data: req.body.data,
        hora: req.body.hora,
        id: req.body.agendamentoId,
    }
    agendamentoModel.findByPk(requisicao.id)
        //Terminar isso aqui
        .then(AgendamentoDataRequest => {
            if (AgendamentoDataRequest == undefined) {
                //Retorno de agendamento não existe no banco de dados
            } else {
                AgendamentoDataRequest.data = AgendamentoDataRequest.data == requisicao.data || AgendamentoDataRequest.data == undefined ? AgendamentoDataRequest.data : requisicao.data
            }
        })

}

const cancelarAgendamento = (req: Request, res: Response) => {

}

const getById = (req: Request, res: Response) => {
    let requisicao = {
        agendamentoId: req.params.id
    }
    //o agendamento so pode ser finalizado pelo provedor que recebeu o pedido
    //o ao ser finalizado, deve ser posto data e hora da finalização.
    try {
        agendamentoModel.findByPk(requisicao.agendamentoId)
            .then(agendamentoDateRequest => {
                if (agendamentoDateRequest) {
                    res.setHeader("content-type", "application/json");
                    res.send(agendamentoDateRequest).status(200);
                } else {
                    res.setHeader("content-type", "application/json");
                    res.send({ "msg": "Sem agendamento no id" }).status(206);
                }
            })
    } catch (err) {

    }
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