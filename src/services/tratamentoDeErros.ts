import { Request, Response } from "express";

const tratamentoDeErros = (req: Request, res: Response, func: Function) => {
    try {
        console.log("Iniciando tratamento de erro")
        func(req, res)
    } catch (err) {
        res.setHeader("content-type", "application/json");
        res.send({ msg: "OCORREU ALGUM ERRO PREENCHA TODOS OS CAMPOS" }).status(500);
    }
}

export default tratamentoDeErros;