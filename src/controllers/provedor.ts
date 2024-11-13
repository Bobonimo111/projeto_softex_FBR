import { Request, Response } from "express";
import provedorModel from "../models/Provedor"
import userModel from "../models/User";
import ProvedorServico from "../models/ProvedorServico";
import * as generics from "./generics"


function login(req: Request, res: Response) {
    const requisicao = {
        email: req.body.email,
        senha: req.body.senha,
        rule: "provedor"
    }
    generics.login(req, res, requisicao, userModel)
};

function cadastro(req: Request, res: Response) {
    const requisicao = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        sexo: req.body.sexo,
        email: req.body.email,
        senha: req.body.senha,
        cnpj: req.body.cnpj, //PODE SER VAZIO
        telefone: req.body.telefone,
        role: "provedor"
    }
    generics.cadastro(req, res, requisicao, userModel, provedorModel)
};

function getByServiceId(req: Request, res: Response) {
    const request = {
        servicoId: req.params.servicoId
    }
    ProvedorServico.findOne({
        where: {
            servicoId: request.servicoId
        }
    }).then(ProvedorServicoDataRequest => {
        if (ProvedorServicoDataRequest == undefined) {
            res.header("content-type", "json/application");
            res.send({ msg: "Provider not found" }).status(204)
        } else {
            provedorModel.findByPk(ProvedorServicoDataRequest.provedorId)
                .then(ProvedorDataRequest => {
                    if (ProvedorDataRequest == undefined) {
                        res.header("content-type", "json/application");
                        res.send({ msg: "Provider not found" }).status(204)
                    } else {
                        userModel.findByPk(ProvedorDataRequest.userId)
                            .then(userDataRequest => {
                                if (userDataRequest == undefined) {
                                    res.header("content-type", "json/application");
                                    res.send({ msg: "Provider not found" }).status(204)
                                } else {
                                    res.header("content-type", "json/application");
                                    res.send(userDataRequest)
                                }
                            })
                    }
                })
        }
    })


}

/*MID FUNCIONA*/
// function test(req: Request, res: Response) {
//     console.log("Middleware funcionando")
//     res.send("ENTROU COM MID")
// }

export { login, cadastro, getByServiceId };