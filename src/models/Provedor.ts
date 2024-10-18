import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';
import User from './User'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas

interface ProvedorAttributes {
    id: bigint;
    userId: bigint;
}

class Provedor extends Model<ProvedorAttributes> implements ProvedorAttributes {
    declare id: bigint;
    declare userId: bigint;

    // timestamps
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Provedor.init(
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
        tableName: 'provedor',
        sequelize,
        timestamps: true,
    }
);

export default Provedor;