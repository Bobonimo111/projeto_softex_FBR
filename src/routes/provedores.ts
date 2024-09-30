import express, { Request, Response } from "express";
const router = express.Router();

//Definir get, post(com criptografia);
router.post("/", function (req: Request, res: Response) {
    //Email
    //Senha
    const { senha } = req.body;
    const { email } = req.body;

    //adicionar criptografia, e escrita no banco de dados
    if (senha == undefined || senha == "") {
        res.set("content-type", "application/json")
        res.json({ error: "Not Recive password!!" }).status(204);
    }
});

router.get("/", function (req: Request, res: Response) {
    res.send("Provedores")
});

export default router;
