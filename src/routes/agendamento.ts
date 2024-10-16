import express, { Response, Request } from "express";
const router = express.Router();
import * as agendamentoController from "../controllers/agendamento"
/**
 * Rota para criar novo agendamento post 
 * Rota para editar agendamento put
 * Rota para cancelar agendamento delete
 */
/**
 * Serviço_id
 * cliente_id
 * provedro_id
 * data
 * hora
 * status
 */

router.post("/", agendamentoController.solicitarNovoAgendamento);
router.put("/:id",);
router.put("/cancel",)

export default router;