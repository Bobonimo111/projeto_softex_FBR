import express from "express";
const router = express.Router();
import * as administradorController from "../controllers/administrador";
//Criar novo adm
//Login como adm
//Remover adm
// router.post()

router.post("/cadastro", administradorController.cadastro);

router.post("/login", administradorController.login);

router.get("/", administradorController.getAll);

router.get("/:id", administradorController.getById);

export default router;