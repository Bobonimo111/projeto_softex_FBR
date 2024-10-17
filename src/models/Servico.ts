import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';

interface ServicoAttributes {
    id: bigint;
    nome: string;
    descricao: string;
    createdAt: Date;
    updatedAt: Date;
}

class Servico extends Model<ServicoAttributes> implements ServicoAttributes {
    public id!: bigint;
    public nome!: string;
    public descricao!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Servico.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
    },
    {
        tableName: 'servico',
        sequelize,
        timestamps: true,
    }
);

export default Servico;