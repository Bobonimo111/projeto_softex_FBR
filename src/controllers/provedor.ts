import express, { Request, Response } from "express";
import provedorModel from "../models/provedores"

function cadastro(req: Request, res: Response) {
    //Email
    //Senha
    const { password } = req.body;
    const { email } = req.body;

    //adicionar criptografia, e escrita no banco de dados
    if (password == undefined || password == "") {
        res.set("content-type", "application/json");
        res.json({ error: "Not Recive password, password is null or invalid" }).status(204);
    } else if (email == undefined || email == "") {
        res.set("content-type", "application/json");
        res.json({ error: "Not Recive email, email is null or invalid" }).status(204);
    } else {
        //se finalmente nada der errado
        //adicionar a criação ao banco de dados
        const provedor = provedorModel.build({ email: email, password: password });
        console.log(provedor)
        provedor.save().then(function () {
            res.send("provedor is created").status(200);
        }).catch(function () {
            //Adicionar um retorno de erro de salvamento da API
            console.log("Ocorreu um erro")
        })
    }
}

export { cadastro };