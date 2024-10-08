import express, { Router } from "express";
import { Response, Request } from "express";
const router = express.Router();
import * as clienteController from "../controllers/cliente"

router.post("/login", clienteController.login);

router.post("/cadastro", clienteController.cadastro);

router.get("/test", (req: Request, res: Response) => {
    res.render("user");
});

export default router;
