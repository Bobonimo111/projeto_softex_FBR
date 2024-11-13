import { Request, Response } from "express";
import userModel from "../models/User"
import clienteModel from "../models/Cliente"
import * as generics from "./generics";

function login(req: Request, res: Response) {
    //Todos os campos da tabela USER;
    const requisicao = {
        email: req.body.email,
        senha: req.body.senha,
        rule: "cliente"
    }
    generics.login(req, res, requisicao, userModel)
    // const { nome } = req.body;
    // const { cpf } = req.body;
    // const { sexo } = req.body;
    // const { email } = req.body;
    // const { senha } = req.body;
    // const { cnpj } = req.body;
    // const { role } = req.body;
    // .catch(err => {
    //     res.setHeader("content-type", "application/json")
    //     res.send({ msg: "INTERNAL ERROR", error: err }).status(502)
    // });

    //Puxar apenas usuarios com emails iguais e que estejam presentes ta tabela de clientes.
};

function cadastro(req: Request, res: Response) {
    //Todos os campos da tabela USER;
    const requisicao = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        sexo: req.body.sexo,
        email: req.body.email,
        senha: req.body.senha,
        cnpj: req.body.cnpj, //PODE SER VAZIO
        telefone: req.body.telefone,
        role: "cliente"
    }
    generics.cadastro(req, res, requisicao, userModel, clienteModel);
    // const { nome } = req.body;
    // const { cpf } = req.body;
    // const { sexo } = req.body;
    // const { email } = req.body;
    // const { senha } = req.body;
    // const { cnpj } = req.body;
    // const { role } = req.body;
    // Object.keys(requisicao).forEach((value) => {
    //     //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
    //     if (requisicao[value] == undefined || requisicao[value] == "" && value != "cnpj") {
    //         res.setHeader("content-type", "application/json")
    //         res.send({ msg: "Not valid value, " + value + " is undefined or null" }).status(406);
    //     }
    // })
    // //adicionar criptografia, e escrita no banco de dados        // let salt = bcrypt.genSaltSync();
    // /* GERAÇÃO DE senha COM HASH */
    // let hash = bcrypt.hashSync(requisicao.senha, 10);
    // requisicao.senha = hash;
    // //se finalmente nada der errado
    // //adicionar a criação ao banco de dados
    // const user = userModel.build(requisicao);
    // // console.log(user)
    // user.save().then(function () {
    //     res.setHeader("content-type", "application/json")
    //     res.send({ "msg": "user is created" }).status(201);
    // }).catch(function (erro: Error) {
    //     console.log("fail to created user");
    //     console.log(erro);
    //     res.setHeader("content-type", "application/json")
    //     res.send({ msg: "fail to created user" }).status(400);
    //     //Adicionar um retorno de erro de salvamento da API 
    // })
}

// function atualizar()

export { login, cadastro };