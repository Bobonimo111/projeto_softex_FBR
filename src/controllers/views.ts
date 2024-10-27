import { Request, Response } from "express";
import servicoModel from "../models/Servico";

//FAZER FORMULARIOS DE VISUALIZAÇÃO 
const home = (req: Request, res: Response) => {

};

const cliente_login = (req: Request, res: Response) => {
    res.render("login")
};

const provedor = (req: Request, res: Response) => {

};

const administrador = (req: Request, res: Response) => {

};

const agendamento = async (req: Request, res: Response) => {
    const servicoDatas = await servicoModel.findAll();
    res.render("agendamento", { servicoDatas: servicoDatas, session: req.session.user })
};

export { home, cliente_login, provedor, administrador, agendamento };