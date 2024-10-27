import express from "express";
const router = express.Router();
import * as viewsController from "../controllers/views";
router.get("/")

router.get("/login", viewsController.cliente_login);
router.get("/cadastro",);

//Gerson deve fazer essa primeira view 
router.get("/agendamento", viewsController.agendamento);
router.get("/responder-requisicao")


export default router;