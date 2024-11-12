import express from "express";
import * as servicoController from "../controllers/servico"
import * as tokenCheck from "../middlewares/tokenCheck.ts"
import tratamentoDeErro from "../services/tratamentoDeErros.ts"
const router = express.Router();
/**
 * Rotas:
 * Criar novo serviço 
 * Modificar serviço existente
 * Buscar serviços
 */
router.post("/criar", tokenCheck.administrador, servicoController.criarServico);

router.post("/definir", tokenCheck.administrador, servicoController.definirServicoParaProvedor);

router.get("/get", servicoController.getAll);

router.get("/get/:servicoId", servicoController.getById);

router.put("/editar", tokenCheck.administrador, servicoController.update);

router.delete("/deletar", tokenCheck.administrador, servicoController.remove);

router.get("/teste", servicoController.teste);

export default router;