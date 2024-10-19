import { Request, Response } from "express";
import provedorModel from "../models/Provedor"
import userModel from "../models/User";
import bcrypt from "bcrypt";
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
        role: "provedor"
    }
    generics.cadastro(req, res, requisicao, userModel, provedorModel)
};

/*MID FUNCIONA*/
// function test(req: Request, res: Response) {
//     console.log("Middleware funcionando")
//     res.send("ENTROU COM MID")
// }

export { login, cadastro };