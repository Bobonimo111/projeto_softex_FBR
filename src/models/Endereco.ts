import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';
import User from './User'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas

interface EnderecoAttributes {
    id: bigint;
    telefone: string;
    telefone2?: string;
    uf: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: bigint;
    userId: bigint;
}

class Endereco extends Model<EnderecoAttributes> implements EnderecoAttributes {
    declare id: bigint;
    declare telefone: string;
    declare telefone2?: string;
    declare uf: string;
    declare cidade: string;
    declare bairro: string;
    declare rua: string;
    declare numero: bigint;
    declare userId: bigint;

    // timestamps
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Endereco.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        telefone: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },
        telefone2: {
            type: DataTypes.STRING(11),
            allowNull: true,
        },
        uf: {
            type: DataTypes.CHAR(2),
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        rua: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        numero: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.BIGINT,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        tableName: 'endereco',
        sequelize,
        timestamps: true,
    }
);

