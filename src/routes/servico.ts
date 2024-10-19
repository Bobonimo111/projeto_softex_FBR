import express from "express";
import * as servicoController from "../controllers/servico"
const router = express.Router();

/**
 * Rotas:
 * Criar novo serviço 
 * Modificar serviço existente
 * Buscar serviços
 */
router.post("/cadastrar", servicoController.create);

export default router;