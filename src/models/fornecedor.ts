import { Model, DataType, DataTypes } from "sequelize";
import dataBase from "./dataBase";

class fornecedor extends Model {
    public id!: number;
    public email!: String;
    public password!: String;
}

fornecedor.init(
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
        sequelize: dataBase,
        tableName: "fornecedores"
    }
)

export default fornecedor;