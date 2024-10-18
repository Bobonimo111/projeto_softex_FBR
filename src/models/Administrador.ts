import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';
import User from './User'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas

interface AdministradorAttributes {
    id: bigint;
    userId: bigint;
}

class Administrador extends Model<AdministradorAttributes> implements AdministradorAttributes {
    declare id: bigint;
    declare userId: bigint;

    // timestamps
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Administrador.init(
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
        tableName: 'administrador',
        sequelize,
        timestamps: true,
    }
);

export default Administrador;