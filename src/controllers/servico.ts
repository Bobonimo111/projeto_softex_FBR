import { Request, Response } from "express";
import servicoModel from "../models/Servico";
import ProvedorServicoModel from "../models/ProvedorServico"
const create = (req: Request, res: Response) => {
    const requisicao = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        servicoId: req.body.servicoId,
        provedorId: req.body.provedorId
    };
    Object.keys(requisicao).forEach((value) => {
        //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
        if (requisicao[value] == undefined || requisicao[value] == "") {
            res.setHeader("content-type", "application/json")
            res.send({ msg: "Not valid value, " + value + " is undefined or null" }).status(406).end();
        }
    })

    servicoModel.create({
        descricao: requisicao.descricao,
        nome: requisicao.nome
    })
        .then((data) => {
            if (data == undefined) {
                res.setHeader("content-type", "application/json");
                res.send({ msg: "SERVICE IS NOT CREATED" }).status(406).end();
            } else {
                ProvedorServicoModel
                    .create({
                        provedorId: requisicao.provedorId,
                        servicoId: data.id
                    }).then(data => {
                        if (data == undefined) {
                            res.setHeader("content-type", "application/json");
                            res.send({ msg: "SEVICE IS NOT CREATED" }).status(406).end();
                        } else {
                            res.setHeader("content-type", "application/json");
                            res.send({ msg: "SEVICE IS CREATED" }).status(201).end();
                        }
                    })
                    .catch(err => {
                        res.setHeader("content-type", "application/json");
                        res.send({ msg: "SEVICE IS NOT CREATED, PROVEDOR NOT EXIST" }).status(406).end();
                    })
            }

        })
        .catch(err => {
            console.log(err)
            res.setHeader("content-type", "application/json")
            res.send(err).status(502)
        })
}
const get = (req: Request, res: Response) => {

}
const getAll = (req: Request, res: Response) => {

}
const update = (req: Request, res: Response) => {

}
const remove = (req: Request, res: Response) => {

}

export { create, get, getAll, update, remove };