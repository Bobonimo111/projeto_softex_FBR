import { Model, DataTypes } from "sequelize"
import { sequelize } from "./dataBase";

/** UM ADMINISTRADOR NÃO PRECISA DE UM EMAIL E SIM DE UMA CREDENCIAL DE LOGIN */
class administradores extends Model {
    declare id: number;
    declare nome: String;
    declare login: String;
    declare password: String;
    declare email?: String;
}

administradores.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "administrador"
})

export default administradores;