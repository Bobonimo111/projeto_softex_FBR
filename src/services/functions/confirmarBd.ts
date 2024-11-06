import { Request, Response } from "express";

const confirmarSimples = function <model>(req: Request, res: Response, data: model, msgOk = "tudo ok", msgError = "algo deu errado") {
    if (data != undefined) {
        res.setHeader("content-type", "application/json")
        res.send({ msg: msgOk }).status(200)
    } else {
        res.setHeader("content-type", "application/json")
        return res.send({ msg: msgError }).status(406).end();
    }
}

export { confirmarSimples }