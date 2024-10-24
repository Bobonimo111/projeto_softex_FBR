import { Request, Response } from "express";
import { Email } from "../services/Email";
import clienteModel from "../models/Cliente"
import provedorModel from "../models/Provedor"
import ServicoModel from "../models/Servico"
import agendamentoModel from "../models/Agendamento"
import axios from "axios";
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
    const requisicao = {
        hora: req.body.hora,
        data: req.body.data,
        servicoId: req.body.servicoId,
        clienteId: req.body.clienteId,
    }
    //Conferir se todos os campos estão preenchidos
    Object.keys(requisicao).forEach((value) => {
        //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
        if (requisicao[value] == undefined || requisicao[value] == "") {
            res.setHeader("content-type", "application/json")
            res.send({ msg: "Not make requisition, " + value + " is undefined" }).status(406);
        }
    })
    agendamentoModel.create(requisicao)
        .then(dataCreateAgendamento => {
            if (dataCreateAgendamento == undefined) {
                res.setHeader("content-type", "application/json")
                res.send({ msg: "agendamento not create" }).status(204);
            } else {
                try {
                    //Iniciar a serie de requisições internas para coletar os dados para a requisição por email
                    const ProvedorDataRequestAxios = axios.get(`http://localhost:${process.env.port}/provedor/getbyserviceid/${requisicao.servicoId}`)
                    res.setHeader("content-type", "application/json")
                    res.send({
                        msg: "created",
                        data: dataCreateAgendamento
                    }).status(201);


                } catch (ex: any) {
                    res.send({ msg: "Not possible to crate a requisition" }).status(500)
                }

            }
        }).catch(dataError => {
            res.send(dataError).status(500)
        })
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