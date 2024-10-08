import { Model, DataType } from "sequelize";
import { sequelize } from "./dataBase";
import Provedor from "./provedores";

class Servico extends Model {
    declare nome: String;
    declare tipo: String;
    //declare provedor: Provedor;
}

Servico.init(
    {},
    {
        sequelize,
        tableName: "servico"
    }
)

export default Servico;