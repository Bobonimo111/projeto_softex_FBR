import { Request, Response } from "express";
import bcrypt from "bcrypt";

const login = function <UserModel>(req: Request, res: Response, requisicao: any, userModel: UserModel,) {
    try {
        Object.keys(requisicao).forEach((value) => {
            //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional

            if (requisicao[value] == undefined || requisicao[value] == "") {
                res.setHeader("content-type", "application/json")
                res.send({ msg: "Not valid value, " + value + " is undefined or null" }).status(406).end();
            }
        })

        userModel.findOne({
            where: {
                email: requisicao.email,
                role: requisicao.rule
            }
        }).then(data => {
            //Se o email não for encontrado
            if (data) {
                // console.log(data) 
                if (bcrypt.compareSync(requisicao.senha, data.senha)) {
                    //ADICIONAR A SESSÃO
                    res.setHeader("content-type", "application/json");
                    //A DEPENDER DA UTILIZAÇÃO INVERTER 
                    // res.send({ msg: "USER LOGGED" }).status(200);
                    req.session.user = {
                        id: data.id,
                        role: data.role
                    }
                    console.log(req.session.user)
                    res.redirect("/agendamento");
                } else {
                    res.setHeader("content-type", "application/json");
                    res.send({ msg: "PASS INVALID" }).status(200);
                }
            } else {
                res.setHeader("content-type", "application/json");
                res.send({ msg: "USER NOT FOUND" }).status(400);
            }
        })

    }
    catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: "OCORREU ALGUM ERRO PREENCHA TODOS OS CAMPOS" }).status(406);
    }
}

const cadastro = function <UserModel, RoleModel>(req: Request, res: Response, requisicao: any, userModel: UserModel, roleModel: RoleModel) {
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
    user.save()
        .then((instance) => {
            roleModel.build({ userId: instance.id })
                .save()
                .then(() => {
                    res.setHeader("content-type", "application/json")
                    res.send({ "msg": "user is created" }).status(201);
                })
                .catch((erro: Error) => {
                    console.log("fail to created user");
                    console.log(erro);
                    res.setHeader("content-type", "application/json")
                    res.send({ msg: "fail to created user" }).status(400);
                })
        }).catch(function (erro: Error) {
            console.log("fail to created user");
            console.log(erro);
            res.setHeader("content-type", "application/json")
            res.send({ msg: "fail to created user" }).status(400);
        })
}

export { cadastro, login };