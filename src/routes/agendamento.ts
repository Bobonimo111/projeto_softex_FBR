import express, { Response, Request } from "express";
const router = express.Router();
import * as agendamentoController from "../controllers/agendamento"
/**
 * Rota para criar novo agendamento post 
 * Rota para editar agendamento put
 * Rota para cancelar agendamento delete
 */

router.post("/novo", agendamentoController.solicitarNovoAgendamento);
router.put("/realizado", agendamentoController.modificarAgendamento);

router.get("/", agendamentoController.verAgendamentos);
router.get("/:agendamentoId", agendamentoController.verAgendamentoPorId);
router.get("/provedor/:provedorId", agendamentoController.verAgendamentosFiltradoPorProvedor);
router.put("/cancelar", agendamentoController.cancelarAgendamento);

export default router;