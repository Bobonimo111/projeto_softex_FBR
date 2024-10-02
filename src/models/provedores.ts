import { Model, DataType, DataTypes } from "sequelize";
import { sequelize } from "./dataBase";

class Provedor extends Model {
    declare id: number;
    declare email: String;
    declare password: String;
}

Provedor.init(
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
        tableName: "provedores"
    }
)

export default Provedor;