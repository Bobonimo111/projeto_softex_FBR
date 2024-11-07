import { Request, Response } from "express";
//import { createReadStream } from "fs";
import { Op } from "sequelize";
import servicoModel from "../models/Servico";
import ProvedorServicoModel from "../models/ProvedorServico"
import * as confirmarBd from "../services/functions/confirmarBd";

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
//Criar novo seriço precisa ser refeito
const criarServico = async (req: Request, res: Response) => {
    try {
        const requisicao = {
            nome: req.body.nome,
            descricao: req.body.descricao
        };
        console.log(requisicao)
        Object.keys(requisicao).forEach((value) => {
            //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
            if (requisicao[value] == undefined || requisicao[value] == "") {
                res.setHeader("content-type", "application/json")
                return res.send({ msg: "Not valid value, " + value + " is undefined or null" }).status(406);
            }
        })
        servicoModel.create(requisicao)
            .then(novoServicoData => {
                //função para simplificar a checagem se uma row foi ou não criada
                return confirmarBd.confirmarSimples(req, res, novoServicoData);
            }).catch(() => {
                res.setHeader("content-type", "application/json")
                return res.send({ msg: "Provedor não encontrado no banco de dados" }).status(406).end();
            });
    } catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: err }).status(500);
    }
}
//Definir quais provedores atendem a esse serviço
const definirServicoParaProvedor = async (req: Request, res: Response) => {
    try {
        //Posso receber tanto um serviço quanto muitos serviços
        const requisicao = {
            provedorId: req.body.provedorId,
            servicoId: req.body.servicoId
        }
        // res.setHeader("content-type", "application/json");
        // res.send(requisicao)
        let servicoProvedores = [];
        //Fazer loop para o provedor
        for (let x of requisicao.provedorId) {
            servicoProvedores.push({ servicoId: requisicao.servicoId, provedorId: x })
        }
        await ProvedorServicoModel.bulkCreate(servicoProvedores);
        console.log(ProvedorServicoModel)
        res.setHeader("content-type", "application/json");
        return res.send({ msg: "OK" }).status(201).end();
    } catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: err }).status(500);
    }
}
const getById = (req: Request, res: Response) => {
    try {
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
    } catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: err }).status(500);
    }
}
const getAll = (req: Request, res: Response) => {
    try {
        //Requisição do tipo body em que sera puxado todos ps seviços do provedor

        //Adicionar os catches de ERRO e O else de undefined se não encontrados
        servicoModel.findAll()
            .then(servicoData => {
                if (servicoData == undefined) {
                    res.set("content-type", "application/json");
                    return res.send({ msg: null }).status(200);
                } else {
                    res.setHeader("content-type", "application/json");
                    res.send(servicoData);
                }
            })
    } catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: err }).status(500);
    }
}
const update = (req: Request, res: Response) => {
    try {
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
    } catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: err }).status(500);
    }
}
const remove = (req: Request, res: Response) => {
    //REMOVE UMA ROW DO BD DE SERVICOS, USANDO UMA REQUISIÇÃO DELETE, MAS O ENVIO DEVE SER FEITO COM VALORES EM BODY, 
    //SENDO O PROVEDOR A QUEM PERTENCE O SERVIÇO E O SERVIÇO A SER DELETADO
    try {
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
    } catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: err }).status(500);
    }
}
const teste = async (req: Request, res: Response) => {
    res.header("content-type", "json/application")
    const retorno = await ServicosComIdsDosProvedores();
    res.send(retorno).status(200)
}
export { criarServico, definirServicoParaProvedor, getById, getAll, update, remove, teste, ServicosComIdsDosProvedores };