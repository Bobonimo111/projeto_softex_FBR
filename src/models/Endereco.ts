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
    public id!: bigint;
    public telefone!: string;
    public telefone2?: string;
    public uf!: string;
    public cidade!: string;
    public bairro!: string;
    public rua!: string;
    public numero!: bigint;
    public userId!: bigint;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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

