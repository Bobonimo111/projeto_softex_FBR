import { Request, Response } from "express";
//import { createReadStream } from "fs";
import { Op } from "sequelize";
import servicoModel from "../models/Servico";
import ProvedorServicoModel from "../models/ProvedorServico"

//Retornar um model de todos os serviços junto ao id de seu provedor
// const ServicosComIdsDosProvedores = () => {
//     return servicoModel.findAll().then(servicoDataRequest => {
//         ProvedorServicoModel.findAll().then((provedorServicoDataRequest) => {
//             let novoRetorno = []
//             servicoDataRequest.forEach(dataExterno => {
//                 provedorServicoDataRequest.forEach(dataInterno => {
//                     if (dataExterno.id == dataInterno.servicoId) {
//                         novoRetorno.push(dataExterno["provedorId"] = dataInterno.provedorId)
//                     }
//                 })
//             })
//             return novoRetorno;
//         })
//     })
// }
const ServicosComIdsDosProvedores = async () => {
    try {
        const servicoDataRequest = await servicoModel.findAll();
        const provedorServicoDataRequest = await ProvedorServicoModel.findAll();

        const novoRetorno = [];

        servicoDataRequest.forEach(dataExterno => {
            provedorServicoDataRequest.forEach(dataInterno => {
                if (dataExterno.id === dataInterno.servicoId) {
                    let dataExternoJson = dataExterno.toJSON();
                    dataExternoJson.provedorId = dataInterno.provedorId; // Adiciona provedorId ao dataExterno
                    novoRetorno.push(dataExternoJson); // Adiciona dataExterno ao array
                }
            });
        });

        return novoRetorno;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }
};

const create = (req: Request, res: Response) => {
    const requisicao = {
        nome: req.body.nome,
        descricao: req.body.descricao,
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
const getById = (req: Request, res: Response) => {
    //A requisição mista com body sendo o id de provedor, e a querry sendo o id de servico
    //Requisição do tipo body por meio do provedor
    const requisicao = {
        provedorId: req.body.provedorId,
        servicoId: req.params.servicoId
    }
    //Adicionar os catches de ERRO e O else de undefined se não encontrados
    ProvedorServicoModel
        .findAll(
            {
                where:
                {
                    provedorId: requisicao.provedorId
                }
            })
        .then(ProvedorServicoDataRequest => {
            if (ProvedorServicoDataRequest == undefined) {
                //provedor não encontrado
                res.setHeader("content-type", "application/json")

                res.send({ msg: "Provedor não encontrado no banco de dados" }).status(406).end();
            } else {
                let isServicoId = ProvedorServicoDataRequest.some(obj => obj.id == requisicao.servicoId);
                //O serviço esta presente no sistema daquele fornecedor
                if (isServicoId) {
                    servicoModel.findByPk(requisicao.servicoId).then(ServicoDataRequest => {
                        if (ServicoDataRequest == undefined) {
                            res.setHeader("content-type", "application/json");
                            res.send({ msg: "serviço não encontrado" }).status(204).end();
                        } else {
                            res.send(ServicoDataRequest).status(200).end();
                        }
                    })
                    //O serviço não esta presente
                } else {
                    res.setHeader("content-type", "application/json");
                    res.send({ msg: "serviço não encontrado" }).status(204).end();
                }
            }
        })
}
const getAll = (req: Request, res: Response) => {
    //Requisição do tipo body em que sera puxado todos ps seviços do provedor
    const requisicao = {
        provedorId: req.body.provedorId
    }
    //Adicionar os catches de ERRO e O else de undefined se não encontrados
    ProvedorServicoModel
        .findAll(
            {
                where:
                {
                    provedorId: requisicao.provedorId
                }
            })
        .then(ProvedorServicoDataRequest => {
            if (ProvedorServicoDataRequest == undefined) {
                //provedor não encontrado
                res.send({ msg: "Provedor não encontrado" }).status(406).end();
            } else {
                res.setHeader('Content-Type', 'text/plain');
                let id = ProvedorServicoDataRequest.map(obj => obj.servicoId);
                servicoModel.findAll({
                    where: {
                        id: {
                            [Op.in]: id
                        }
                    }
                })
                    .then(ServicoDataRequest => {
                        if (ServicoDataRequest == undefined) {
                            res.send({ msg: "Nenhum serviço encontrado" }).status(204).end();
                        } else {

                        }

                        res.send(ServicoDataRequest).end();
                    })
            }
        })
}
const update = (req: Request, res: Response) => {
    //A requisição mista com body sendo o id de provedor, e a querry sendo o id de servico
    //Requisição do tipo body por meio do provedor
    //ENVIA UMA REQUISIÇÃO DO TIPO PUT
    //PRECISA DE UM BODY COM A DESCRIÇÃO,NOME,PROVEDORID E SERVICOID;
    //SE O NOME OU A DESCRIÇÃO ESTIVEREM VAZIAS, VAI SER MANTIDO O VALOR ATUAL NO DB;
    let requisicao = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        provedorId: req.body.provedorId,
        servicoId: req.body.servicoId
    }
    //Adicionar os catches de ERRO e O else de undefined se não encontrados
    ProvedorServicoModel
        .findAll(
            {
                where:
                {
                    provedorId: requisicao.provedorId
                }
            })
        .then(ProvedorServicoDataRequest => {
            if (ProvedorServicoDataRequest == undefined) {
                //provedor não encontrado
                res.setHeader("content-type", "application/json")

                res.send({ msg: "Provedor não encontrado no banco de dados" }).status(406).end();
            } else {
                let isServicoId = ProvedorServicoDataRequest.some(obj => obj.id == requisicao.servicoId);
                //O serviço esta presente no sistema daquele fornecedor
                if (isServicoId) {
                    servicoModel.findByPk(requisicao.servicoId)
                        .then(ServicoDataRequest => {
                            if (ServicoDataRequest == undefined) {
                                res.setHeader("content-type", "application/json");
                                res.send({ msg: "serviço não encontrado" }).status(204).end();
                            } else {
                                ServicoDataRequest.descricao = requisicao.descricao == undefined || requisicao.descricao == "" ? ServicoDataRequest.descricao : requisicao.descricao;
                                ServicoDataRequest.nome = requisicao.nome == undefined || requisicao.nome == "" ? ServicoDataRequest.nome : requisicao.nome;

                                res.send({ msg: "Servico atualizado" }).status(200).end();
                                //res.send(ServicoDataRequest)
                                return ServicoDataRequest.save();


                            }
                        })
                    //O serviço não esta presente
                } else {
                    res.setHeader("content-type", "application/json");

                    res.send({ msg: "serviço não encontrado" }).status(204).end();
                }
            }
        })
}
const remove = (req: Request, res: Response) => {
    //REMOVE UMA ROW DO BD DE SERVICOS, USANDO UMA REQUISIÇÃO DELETE, MAS O ENVIO DEVE SER FEITO COM VALORES EM BODY, 
    //SENDO O PROVEDOR A QUEM PERTENCE O SERVIÇO E O SERVIÇO A SER DELETADO
    const requisicao = {
        provedorId: req.body.provedorId,
        servicoId: req.body.servicoId
    }
    //Adicionar os catches de ERRO e O else de undefined se não encontrados
    ProvedorServicoModel
        .findAll(
            {
                where:
                {
                    provedorId: requisicao.provedorId
                }
            })
        .then(ProvedorServicoDataRequest => {
            if (ProvedorServicoDataRequest == undefined) {
                //provedor não encontrado
                res.setHeader("content-type", "application/json")

                res.send({ msg: "Provedor não encontrado no banco de dados" }).status(406).end();
            } else {
                let isServicoId = ProvedorServicoDataRequest.some(obj => obj.id == requisicao.servicoId);
                //O serviço esta presente no sistema daquele fornecedor
                if (isServicoId) {
                    //Remoção do banco de dados "intermediario" para não se ter um erro de referencias.
                    ProvedorServicoModel.destroy({
                        where: {
                            provedorId: requisicao.provedorId,
                            servicoId: requisicao.servicoId,
                        }
                    })
                    //Remoção do serviço do banco de dados, original.
                    servicoModel.findByPk(requisicao.servicoId).then(ServicoDataRequest => {
                        if (ServicoDataRequest == undefined) {
                            res.setHeader("content-type", "application/json");
                            res.send({ msg: "serviço não encontrado" }).status(204).end();
                        } else {
                            res.send({ msg: "o serviço foi removido do banco de dados" }).status(200).end();
                            return ServicoDataRequest.destroy();
                        }
                    })
                    //O serviço não esta presente
                } else {
                    res.setHeader("content-type", "application/json");

                    res.send({ msg: "serviço não encontrado" }).status(204).end();
                }
            }
        })
}
const teste = async (req: Request, res: Response) => {
    res.header("content-type", "json/application")
    const retorno = await ServicosComIdsDosProvedores();
    res.send(retorno).status(200)
}
export { create, getById, getAll, update, remove, teste, ServicosComIdsDosProvedores };