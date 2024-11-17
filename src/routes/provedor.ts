import express from "express";
const router = express.Router();
import * as provedorController from "../controllers/provedor";
/**
 * Rotas:
 * Criar novo provedor apenas FBR
 * Logar como provedor
 * Retornar todos os provedores para FBR
 */

/** DEFINIR PARA QUE O PROVEDOR CONSIGA ACESSAR A APARTIR DA SENHA DEFINIDA */
router.post("/login", provedorController.login);

/* DEFINIR MIDDLEARE OU SENHA PARA QUE APENAS UM ADM CONSIGA CRIAR UM PROVEDOR */
router.post("/cadastro", provedorController.cadastro);

/* Passo o id de um serviço e ele retorna os dados do provedor responsavel */
router.get("/service/:servicoId", provedorController.getByServiceId);

router.get("/", provedorController.getAll);
//router.get("/test", logger.provedor, provedorController.test);

router.get("/:id", provedorController.getById);

export default router;
