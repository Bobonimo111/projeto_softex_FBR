import express from "express";
const router = express.Router();
import * as viewsController from "../controllers/views";
router.get("/")

router.get("/login", viewsController.cliente_login);
router.get("/cadastro",);

//Agendamento
router.get("/agendamento", viewsController.agendamento);
router.get("/responder-requisicao")
router.get("/responder-agendamento/:id", viewsController.responderAgendamento)

export default router;