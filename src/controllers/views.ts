import { Request, Response } from "express";
import servicoModel from "../models/Servico";
import agendamentoModel from "../models/Agendamento"
import { where } from "sequelize";

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

const responderAgendamento = async (req: Request, res: Response) => {
    // metodo GET, recebe um id via email;
    const id: string = req.params.id;
    if (id == undefined || id == "") {
        res.setHeader("content-type", "application/json");
        res.send({ msg: "id not received" }).status(200).end();
        return;
    }
    const agendamentoData = await agendamentoModel.findOne({ where: { id: id } });
    const servicoData = await servicoModel.findByPk(agendamentoData?.servicoId);
    res.render("confirmarAgendamento",
        {
            agendamentoData: agendamentoData,
            servicoData: servicoData
        });

}

export { home, cliente_login, provedor, administrador, agendamento, responderAgendamento };