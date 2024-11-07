import express from "express";
import * as servicoController from "../controllers/servico"
import * as tokenCheck from "../middlewares/tokenCheck.ts"
const router = express.Router();
/**
 * Rotas:
 * Criar novo serviço 
 * Modificar serviço existente
 * Buscar serviços
 */
router.post("/criar", tokenCheck.administrador, servicoController.criarServico);
router.post("/definir", servicoController.definirServicoParaProvedor)
router.get("/get", tokenCheck.administrador, servicoController.getAll);
router.get("/get/:servicoId", servicoController.getById);
router.put("/editar", servicoController.update);
router.delete("/deletar", servicoController.remove);
router.get("/teste", servicoController.teste);

export default router;