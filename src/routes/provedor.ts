import express from "express";
const router = express.Router();
import * as provedorController from "../controllers/provedor";


//Definir get, post, com criptografia;
/* DEFINIR MIDDLEARE OU SENHA PARA QUE APENAS UM ADM CONSIGA CRIAR UM PROVEDOR */
router.post("/", provedorController.cadastro);


export default router;
