import { Request, Response } from "express";
import provedorModel from "../models/Provedor"
import bcrypt from "bcrypt";

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
        let hash = bcrypt.hashSync(password, 10);
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
};

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
        provedorModel.findOne({ where: { "email": email } }).then(data => {
            if (data) {
                if (bcrypt.compareSync(password, data.password.toString())) {
                    /*QUALQUER ERRO É CULPA DA IDE, AS SESSÕES ESTÃO FUNCIONANDO NORMALMENTE*/
                    req.session.auth = true;
                    req.session.type = "provedor"
                    //console.log(req.session)
                    res.send({ msg: "OK" }).status(202);
                } else {
                    res.send({ msg: "Incorrect password" }).status(404);
                }
            } else {
                res.send({ msg: "Email is not found" }).status(404)
            }
        })
    }
};

/*MID FUNCIONA*/
// function test(req: Request, res: Response) {
//     console.log("Middleware funcionando")
//     res.send("ENTROU COM MID")
// }

export { cadastro, login, test };