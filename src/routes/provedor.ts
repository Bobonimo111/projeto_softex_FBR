import express from "express";
const router = express.Router();
import * as logger from "../middlewares/loggers";
import * as provedorController from "../controllers/provedor";
/**
 * Rotas:
 * Criar novo provedor apenas FBR
 * Logar como provedor
 * Retornar todos os provedores para FBR
 */

//Definir get, post, com criptografia;
/* DEFINIR MIDDLEARE OU SENHA PARA QUE APENAS UM ADM CONSIGA CRIAR UM PROVEDOR */
router.post("/cadastro", logger.adm, provedorController.cadastro);

/** DEFINIR PARA QUE O PROVEDOR CONSIGA ACESSAR A APARTIR DA SENHA DEFINIDA */
router.post("/login", provedorController.login);

//router.get("/test", logger.provedor, provedorController.test);
export default router;
