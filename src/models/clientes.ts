import { Model, DataType } from "sequelize";
import { sequelize } from "./dataBase";

class Clientes extends Model {

}


Clientes.init(
    //Aqui vem os atributos de cliente
    {},
    {
        sequelize,
        tableName: "cliente"
    }
)

export default Clientes;