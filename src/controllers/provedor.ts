import express, { Request, Response } from "express";
import provedorModel from "../models/provedores"
import bccypt from "bcrypt";

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
        let hash = bccypt.hashSync(password, 10);
        //se finalmente nada der errado
        //adicionar a criação ao banco de dados
        const provedor = provedorModel.build({ email: email, password: hash });
        // console.log(provedor)
        provedor.save().then(function () {
            res.send("provedor is created").status(201);
        }).catch(function () {
            res.send("fail to created provedor").status(400);
            //Adicionar um retorno de erro de salvamento da API
            console.log("fail to created provedor");
        })
    }
}


export { cadastro };