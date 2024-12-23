import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase'; // Certifique-se de importar sua instância do Sequelize

interface UserAttributes {
    nome: string;
    cpf: string;
    sexo: string;
    email: string;
    senha: string;
    telefone: string;
    createdAt?: Date;
    updatedAt?: Date;
    cnpj: string;
    role: 'cliente' | 'provedor' | 'administrador';
}

class User extends Model<UserAttributes> implements UserAttributes {
    declare nome: string;
    declare cpf: string;
    declare sexo: string;
    declare email: string;
    declare senha: string;
    declare telefone: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare cnpj: string;
    declare role: 'cliente' | 'provedor' | 'administrador';
}

User.init(
    {
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },
        sexo: {
            type: DataTypes.CHAR(2),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        cnpj: {
            type: DataTypes.STRING(14),
            allowNull: true, // dependendo do requisito
        },
        role: {
            type: DataTypes.ENUM('cliente', 'provedor', 'administrador'),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize, // passando a instância do sequelize
        timestamps: true,
    }
);

export default User;