import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';
import User from './User'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas

interface ClienteAttributes {
    id: bigint;
    userId: bigint;
}

class Cliente extends Model<ClienteAttributes> implements ClienteAttributes {
    declare id: bigint;
    declare userId: bigint;

    // timestamps
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Cliente.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.BIGINT,
            references: {
                model: User, // nome do model que estamos referenciando
                key: 'id', // chave primÃ¡ria do model User
            },
            allowNull: false,
        },
    },
    {
        tableName: 'cliente',
        sequelize,
        timestamps: true,
    }
);

export default Cliente;