import express, { Request, Response } from "express";
import clienteModel from "../models/clientes";
import bcrypt from "bcrypt";

function login(req: Request, res: Response) {
    const { email } = req.body;
    const { password } = req.body;
    if (password == undefined || password == "") {
        res.set("content-type", "application/json");
        res.json({ error: "Not Recive password, password is null or invalid" }).status(204);
    } else if (email == undefined || email == "") {
        res.set("content-type", "application/json");
        res.json({ error: "Not Recive email, email is null or invalid" }).status(204);
    } else {
        /*REALIZAR CONFERENCIA DE CREDENCIAIS*/
        clienteModel.findOne({ where: { "email": email } })
            .then((data) => {
                console.log(data);
                res.send("Encontrado \n" + data).status(302);
            }).catch(() => {
                console.log("Não encontrado");
                res.send("Não encontrado").status(404);
            })
    }

};

function cadastro(req: Request, res: Response) {
    const { email } = req.body;
    const { password } = req.body;
    //adicionar criptografia, e escrita no banco de dados
    if (password == undefined || password == "") {
        res.set("content-type", "application/json");
        res.json({ error: "Not Recive password, password is null or invalid" }).status(204);
    } else if (email == undefined || email == "") {
        res.set("content-type", "application/json");
        res.json({ error: "Not Recive email, email is null or invalid" }).status(204);
    } else {
        // let salt = bcrypt.genSaltSync();
        /* GERAÇÃO DE PASSWORD COM HASH */
        let hash = bcrypt.hashSync(password, 10);
        //se finalmente nada der errado
        //adicionar a criação ao banco de dados
        const provedor = clienteModel.build({ email: email, password: hash });
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
