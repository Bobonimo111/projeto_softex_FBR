import express from "express";
const router = express.Router();
import * as provedorController from "../controllers/provedor";


//Definir get, post, com criptografia;
router.post("/", provedorController.cadastro);

// router.get("/", function (req: Request, res: Response) {
//     //Retorna 
//     res.send("Provedores")
// });

// router.get("/all", function (req: Request, res: Response) {
//     //retornar todos os provedores cadastrados
// })

export default router;
