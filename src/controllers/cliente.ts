import { Request, Response } from "express";
import clienteModel from "../models/clientes";
import bcrypt from "bcrypt";

function login(req: Request, res: Response) {
    const { email } = req.body;
    const { password } = req.body;
    if (password == undefined || password == "") {
        res.set("content-type", "application/json");
        res.json({ msg: "Not Recive password, password is null or invalid" }).status(204);
    } else if (email == undefined || email == "") {
        res.set("content-type", "application/json");
        res.json({ msg: "Not Recive email, email is null or invalid" }).status(204);
    } else {
        /*REALIZAR CONFERENCIA DE CREDENCIAIS*/
        clienteModel.findOne({ where: { "email": email } }).then(data => {
            if (data) {
                if (bcrypt.compareSync(password, data.password.toString())) {
                    res.send({ msg: "OK" }).status(202);
                } else {
                    res.send({ msg: "Incorrect password" }).status(404);
                }
            } else {
                res.send({ msg: "Email is not found" }).status(404);
            }
        })
    }
};

function cadastro(req: Request, res: Response) {
    const { email } = req.body;
    const { password } = req.body;
    //adicionar criptografia, e escrita no banco de dados
    if (password == undefined || password == "") {
        res.set("content-type", "application/json");
        res.json({ msg: "Not Recive password, password is null or invalid" }).status(204);
    } else if (email == undefined || email == "") {
        res.set("content-type", "application/json");
        res.json({ msg: "Not Recive email, email is null or invalid" }).status(204);
    } else {
        // let salt = bcrypt.genSaltSync();
        /* GERAÇÃO DE PASSWORD COM HASH */
        let hash = bcrypt.hashSync(password, 10);
        //se finalmente nada der errado
        //adicionar a criação ao banco de dados
        const cliente = clienteModel.build({ email: email, password: hash });
        // console.log(cliente)
        cliente.save().then(function () {
            res.send("cliente is created").status(201);
        }).catch(function (erro: Error) {
            res.send("fail to created cliente").status(400);
            //Adicionar um retorno de erro de salvamento da API
            console.log("fail to created cliente");
            console.log(erro);
        })
    }
}

// function atualizar()

export { login, cadastro };