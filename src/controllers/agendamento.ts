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
//confirma que o agendamento, ja foi feito
const modificarAgendamento = (req: Request, res: Response) => {
    try {

        const requisicao = {
            id: req.body.agendamentoId
        }
        Object.keys(requisicao).forEach((value) => {
            //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
            if (requisicao[value] == undefined || requisicao[value] == "") {
                res.setHeader("content-type", "application/json")
                return res.send({ msg: "Not make requisition, " + value + " is undefined" }).status(406);
            }
        })
        agendamentoModel.findByPk(requisicao.id)
            //Terminar isso aqui
            .then(AgendamentoDataRequest => {
                if (!AgendamentoDataRequest) {
                    res.setHeader('content-type', "application/json");
                    return res.send(null).status(200).end();
                } else {

                    //CHATGPT
                    const agora = new Date();
                    const horas = agora.getHours();
                    const minutos = agora.getMinutes();
                    const mes = String(agora.getMonth() + 1).padStart(2, '0');
                    const dia = String(agora.getDate()).padStart(2, '0');
                    const ano = agora.getFullYear();
                    const dataFormatoAmericano = `${mes}/${dia}/${ano}`;
                    // AgendamentoDataRequest.data = new Date(dataFormatoAmericano);
                    // AgendamentoDataRequest.hora = `${horas}:${minutos}`;
                    AgendamentoDataRequest.update({
                        data: new Date(dataFormatoAmericano),
                        hora: `${horas}:${minutos}`,
                        status: "realizado"
                    })
                    res.setHeader("content-type", "application/json");
                    return res.send(AgendamentoDataRequest).status(200).end();
                }
            })
    } catch (erro) {
        res.setHeader('content-type', "application/json");
        return res.send(erro).status(500).end();
    }

}

const cancelarAgendamento = (req: Request, res: Response) => {
    try {
        const requisicao = {
            id: req.body.agendamentoId
        }
        Object.keys(requisicao).forEach((value) => {
            //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
            if (requisicao[value] == undefined || requisicao[value] == "") {
                res.setHeader("content-type", "application/json")
                return res.send({ msg: "Not make requisition, " + value + " is undefined" }).status(406);
            }
        })
        agendamentoModel.findByPk(requisicao.id)
            //Terminar isso aqui
            .then(AgendamentoDataRequest => {
                if (!AgendamentoDataRequest) {
                    res.setHeader('content-type', "application/json");
                    return res.send(null).status(200).end();
                } else {

                    //CHATGPT
                    const agora = new Date();
                    const horas = agora.getHours();
                    const minutos = agora.getMinutes();
                    const mes = String(agora.getMonth() + 1).padStart(2, '0');
                    const dia = String(agora.getDate()).padStart(2, '0');
                    const ano = agora.getFullYear();
                    const dataFormatoAmericano = `${mes}/${dia}/${ano}`;
                    // AgendamentoDataRequest.data = new Date(dataFormatoAmericano);
                    // AgendamentoDataRequest.hora = `${horas}:${minutos}`;
                    AgendamentoDataRequest.update({
                        status: "cancelado"
                    })
                    res.setHeader("content-type", "application/json");
                    return res.send(AgendamentoDataRequest).status(200).end();
                }
            })
    } catch (erro) {
        res.setHeader('content-type', "application/json");
        return res.send(erro).status(500).end();
    }
}

// const getById = (req: Request, res: Response) => {
//     let requisicao = {
//         agendamentoId: req.params.id
//     }
//     //o agendamento so pode ser finalizado pelo provedor que recebeu o pedido
//     //o ao ser finalizado, deve ser posto data e hora da finalização.
//     try {
//         agendamentoModel.findByPk(requisicao.agendamentoId)
//             .then(agendamentoDateRequest => {
//                 if (agendamentoDateRequest) {
//                     res.setHeader("content-type", "application/json");
//                     res.send(agendamentoDateRequest).status(200);
//                 } else {
//                     res.setHeader("content-type", "application/json");
//                     res.send({ "msg": "Sem agendamento no id" }).status(206);
//                 }
//             })
//     } catch (err) {

//     }
// }
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
const verAgendamentos = (req: Request, res: Response) => {
    agendamentoModel.findAll()
        .then(agendamentoRequestModel => {
            if (agendamentoRequestModel == undefined) {
                res.setHeader("content-type", "application/json");
                return res.send(null).status(200).end()
            } else {
                res.setHeader("content-type", "application/json");
                return res.send(agendamentoRequestModel).status(200).end()
            }
        }).catch(err => {
            res.setHeader("content-type", "application/json");
            return res.send(err).status(500).end()
        })
}
const verAgendamentoPorId = (req: Request, res: Response) => {
    console.log("POR ID DE AGENDAMENTO ")
    const requisicao = {
        agendamentoId: req.params.agendamentoId
    }
    agendamentoModel.findByPk(requisicao.agendamentoId)
        .then(agendamentoRequestModel => {
            if (agendamentoRequestModel == undefined) {
                res.setHeader("content-type", "application/json");
                return res.send(null).status(200).end();
            } else {
                res.setHeader("content-type", "application/json");
                return res.send(agendamentoRequestModel).status(200).end();
            }
        })
        .catch(err => {
            res.setHeader("content-type", "application/json");
            return res.send(err).status(500).end()
        })
}
const verAgendamentosFiltradoPorProvedor = (req: Request, res: Response) => {
    console.log("POR ID DE PROVEDOR ")
    const requisicao = {
        provedorId: req.params.provedorId
    }
    agendamentoModel.findAll({
        where: { provedorId: requisicao.provedorId }
    })
        .then(agendamentoDataRequest => {
            if (agendamentoDataRequest == undefined) {
                res.setHeader("content-type", "application/json");
                return res.send(null).status(200).end();
            } else {
                res.setHeader("content-type", "application/json");
                return res.send(agendamentoDataRequest).status(200).end();
            }
        }).catch(err => {
            res.setHeader("content-type", "application/json");
            return res.send(err).status(500).end()
        })
}
export { solicitarNovoAgendamento, modificarAgendamento, cancelarAgendamento, verAgendamentos, verAgendamentoPorId, verAgendamentosFiltradoPorProvedor };