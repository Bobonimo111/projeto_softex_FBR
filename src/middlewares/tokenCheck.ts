import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

//Definir o tipo de acesso direto na rota
function administrador(req: Request, res: Response, next: NextFunction) {
    const role = "administrador"
    const token = req.headers["authorization"]
    console.log(token)
    if (!token) {
        return res.send({ msg: "Token nescessario" }).status(403).end();
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.send({ msg: "Token invalido" }).status(403).end();
        }
        if (decoded.rule !== role) {
            return res.send({ msg: "Acesso negado" }).status(403).end();
        }

        req.user = decoded;
        next();
    })
}
function cliente(req: Request, res: Response, next: NextFunction) {
    const role = "cliente"
    const token = req.headers["authorization"]
    console.log(token)
    if (!token) {
        return res.send({ msg: "Token nescessario" }).status(403).end();
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.send({ msg: "Token invalido" }).status(403).end();
        }
        if (decoded.rule !== role) {
            return res.send({ msg: "Acesso negado" }).status(403).end();
        }

        req.user = decoded;
        next();
    })
}
function provedor(req: Request, res: Response, next: NextFunction) {
    const role = provedor;
    const token = req.headers["authorization"]
    console.log(token)
    if (!token) {
        return res.send({ msg: "Token nescessario" }).status(403).end();
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.send({ msg: "Token invalido" }).status(403).end();
        }
        if (decoded.rule !== role) {
            return res.send({ msg: "Acesso negado" }).status(403).end();
        }

        req.user = decoded;
        next();
    })
}

export { administrador, cliente, provedor };