import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//User model é o UserModel e roleModel pode ser adminitradorModel clienteModel provedorModel
const login = function <UserModel>(req: Request, res: Response, requisicao: any, userModel: UserModel,) {
    try {
        Object.keys(requisicao).forEach((value) => {
            //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional

            if (requisicao[value] == undefined || requisicao[value] == "") {
                res.setHeader("content-type", "application/json")
                return res.send({ msg: "Not valid value, " + value + " is undefined or null" }).status(400).end();
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
                    // req.session.user = {
                    //     id: data.id,
                    //     role: data.role
                    // }
                    // console.log(req.session.user)
                    const token = jwt.sign(requisicao, process.env.JWT_SECRET, {
                        expiresIn: "2h"
                    })
                    return res.json({ auth: true, token: token }).status(200);
                    //res.redirect("/agendamento");
                } else {
                    res.setHeader("content-type", "application/json");
                    return res.send({ msg: "PASS INVALID" }).status(200);
                }
            } else {
                res.setHeader("content-type", "application/json");
                return res.send({ msg: "USER NOT FOUND" }).status(400);
            }
        })

    }
    catch (err) {
        res.setHeader("content-type", "application/json");
        return res.send({ msg: err }).status(500);
    }
}

//User model é o UserModel e roleModel pode ser adminitradorModel clienteModel provedorModel
const cadastro = function <UserModel, RoleModel>(req: Request, res: Response, requisicao: any, userModel: UserModel, roleModel: RoleModel) {
    try {

        Object.keys(requisicao).forEach((value) => {
            //Se qualquer campo for vazio ou undefined retornara um erro se ele for diferente de descrição que é opcional
            if (requisicao[value] == undefined || requisicao[value] == "" && value != "cnpj") {
                res.setHeader("content-type", "application/json")
                return res.send({ msg: "Not valid value, " + value + " is undefined or null" }).status(400);
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
                        return res.send({ "msg": "Instancia de user/" + instance.role }).status(201);
                    })
                    .catch((erro: Error) => {
                        //Erro interno
                        res.setHeader("content-type", "application/json")
                        return res.send({ msg: erro }).status(500);
                    })
            }).catch(function (erro: Error) {
                //Erro interno
                res.setHeader("content-type", "application/json")
                return res.send({ msg: erro }).status(500);
            })
    } catch (err) {
        // console.log(erro);
        res.setHeader("content-type", "application/json");
        return res.send({ msg: err }).status(500);
    }
}

//User model é o UserModel e roleModel pode ser adminitradorModel clienteModel provedorModel
const getAll = function <UserModel, RoleModel>(req: Request, res: Response, userModel: UserModel, roleModel: RoleModel) {
    roleModel.findAll()
        .then((roleDataRequest) => {
            let ids = roleDataRequest.map(objeto => objeto.userId);
            userModel.findAll(
                {
                    where: {
                        id: ids
                    }
                }
            ).then((userDataRequest) => {
                res.setHeader("content-type", "application/json");
                return res.send(userDataRequest).status(200);
            }).catch((err) => {
                res.setHeader("content-type", "application/json");
                return res.send({ msg: err }).status(500);
            });
        }).catch((err) => {
            res.setHeader("content-type", "application/json");
            return res.send({ msg: err }).status(500);
        });
}
export { cadastro, login, getAll };