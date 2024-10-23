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
router.get("/get", servicoController.getAll);
router.get("/get/:servicoId", servicoController.getById);
router.put("/editar", servicoController.update);
router.delete("/delete", servicoController.remove);


export default router;