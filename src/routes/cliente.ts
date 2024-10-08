import express, { Router } from "express";
import { Response, Request } from "express";
import fs from "fs";
import { join } from "path";
const router = express.Router();


router.get("/test", (req: Request, res: Response) => {
    res.render("user");
})


export default router;
