import express, { Request, Response } from "express";
import clienteModel from "../models/clientes"

export const login = (req: Request, res: Response) => {

};

export const cadastro = (req: Request, res: Response) => {
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
        //se finalmente nada der errado
        //adicionar a criação ao banco de dados
        const provedor = clienteModel.build({ email: email, password: password });
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
