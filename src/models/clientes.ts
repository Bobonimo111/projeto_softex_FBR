import { Model, DataTypes } from "sequelize";
import { sequelize } from "./dataBase";

class Clientes extends Model {
    declare id: number;
    declare email: String;
    declare password: String;
}


Clientes.init(
    //Aqui vem os atributos de cliente
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "cliente"
    }
)

//REMOVER AO FINAL DE TUDO
// Clientes.sync({ force: true })

export default Clientes;