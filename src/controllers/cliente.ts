import { Request, Response } from "express";
import userModel from "../models/User"
import userModel from "../models/user";
import bcrypt from "bcrypt";

function login(req: Request, res: Response) {
    //Todos os campos da tabela USER;
    const requisicao = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        sexo: req.body.sexo,
        email: req.body.email,
        senha: req.body.senha,
        cnpj: req.body.cnpj, //PODE SER VAZIO
        role: req.body.role
    }
    // const { nome } = req.body;
    // const { cpf } = req.body;
    // const { sexo } = req.body;
    // const { email } = req.body;
    // const { senha } = req.body;
    // const { cnpj } = req.body;
    // const { role } = req.body;
    Object.keys(requisicao).forEach((value) => {
        //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
        if (requisicao[value] == undefined || requisicao[value] == "" && value != "cnpj") {
            res.setHeader("content-type", "application/json")
            res.send({ msg: "Not valid value, " + value + " is undefined or null" }).status(406);
        }
    })

    // if (senha == undefined || senha == "") {
    //     res.set("content-type", "application/json");
    //     res.json({ msg: "Not Recive senha, senha is null or invalid" }).status(204);
    // } else if (email == undefined || email == "") {
    //     res.set("content-type", "application/json");
    //     res.json({ msg: "Not Recive email, email is null or invalid" }).status(204);
    // } else {
    //     /*REALIZAR CONFERENCIA DE CREDENCIAIS*/
    //     userModel.findOne({ where: { "email": email } }).then(data => {
    //         if (data) {
    //             if (bcrypt.compareSync(senha, data.senha.toString())) {
    //                 req.session.auth = true;
    //                 req.session.type = "user";
    //                 res.send({ msg: "OK" }).status(202);
    //             } else {
    //                 res.send({ msg: "Incorrect senha" }).status(404);
    //             }
    //         } else {
    //             res.send({ msg: "Email is not found" }).status(404);
    //         }
    //     })
    // }
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
        role: req.body.role
    }
    // const { nome } = req.body;
    // const { cpf } = req.body;
    // const { sexo } = req.body;
    // const { email } = req.body;
    // const { senha } = req.body;
    // const { cnpj } = req.body;
    // const { role } = req.body;
    Object.keys(requisicao).forEach((value) => {
        //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
        if (requisicao[value] == undefined || requisicao[value] == "" && value != "cnpj") {
            res.setHeader("content-type", "application/json")
            res.send({ msg: "Not valid value, " + value + " is undefined or null" }).status(406);
        }
    })
    //adicionar criptografia, e escrita no banco de dados        // let salt = bcrypt.genSaltSync();
    /* GERAÇÃO DE senha COM HASH */
    let hash = bcrypt.hashSync(requisicao.senha, 10);
    requisicao.senha = hash;
    //se finalmente nada der errado
    //adicionar a criação ao banco de dados
    const user = userModel.build(requisicao);
    // console.log(user)
    user.save().then(function () {
        res.send("user is created").status(201);
    }).catch(function (erro: Error) {
        console.log("fail to created user");
        console.log(erro);
        res.send("fail to created user").status(400);
        //Adicionar um retorno de erro de salvamento da API 
    })
}


// function atualizar()

export { login, cadastro };