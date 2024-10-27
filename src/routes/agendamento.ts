import express, { Response, Request } from "express";
const router = express.Router();
import * as agendamentoController from "../controllers/agendamento"
/**
 * Rota para criar novo agendamento post 
 * Rota para editar agendamento put
 * Rota para cancelar agendamento delete
 */

router.post("/novo", agendamentoController.solicitarNovoAgendamento);
router.put("/", agendamentoController.modificarAgendamento);
router.put("/cancelar",)

export default router;