import { Response, Request } from "express";

function adm(req: Request, res: Response, next) {
    if (req.session.user) {
        next()
    } else {
        res.send({ "msg": "acess not autorized" }).status(401);
    }
}

export { adm }