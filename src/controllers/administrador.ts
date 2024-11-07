import { Request, Response } from "express";
import * as generics from "./generics";
import administradorModel from "../models/Administrador"
import userModel from "../models/User"


function login(req: Request, res: Response) {
    //Todos os campos da tabela USER;
    const requisicao = {
        email: req.body.email,
        senha: req.body.senha,
        rule: "administrador"
    }

    generics.login(req, res, requisicao, userModel)
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
        role: "administrador"
    }
    generics.cadastro(req, res, requisicao, userModel, administradorModel);

};

export { login, cadastro };