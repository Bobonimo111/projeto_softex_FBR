import { Response, Request } from "express";

function adm(req: Request, res: Response, next) {
    if (req.session.auth && req.session.type == 'administracao') {
        next()
    } else {
        res.send({ "msg": "acess not autorized" }).status(401);
    }
}

function provedor(req: Request, res: Response, next) {
    if (req.session.auth && req.session.type == 'provedor') {
        next()
    } else {
        res.send({ "msg": "acess not autorized" }).status(401);
    }
}

function cliente(req: Request, res: Response, next) {
    if (req.session.auth && req.session.type == 'cliente') {
        next()
    } else {
        res.send({ "msg": "acess not autorized" }).status(401);
    }
}


export { adm, provedor, cliente }