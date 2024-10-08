import express from "express";
const router = express.Router();
import * as provedorController from "../controllers/provedor";


//Definir get, post, com criptografia;
/* DEFINIR MIDDLEARE OU SENHA PARA QUE APENAS UM ADM CONSIGA CRIAR UM PROVEDOR */
router.post("/", provedorController.cadastro);

/** DEFINIR PARA QUE O PROVEDOR CONSIGA ACESSAR A APARTIR DA SENHA DEFINIDA */
router.post("/", provedorController.login);

export default router;
