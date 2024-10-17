import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';
import Servico from './Servico'; // Ajuste o caminho conforme necessário
import Provedor from './Provedor'; // Ajuste o caminho conforme necessário

interface ProvedorServicoAttributes {
    id: bigint;
    servicoId: bigint;
    provedorId: bigint;
}

class ProvedorServico extends Model<ProvedorServicoAttributes> implements ProvedorServicoAttributes {
    public id!: bigint;
    public servicoId!: bigint;
    public provedorId!: bigint;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProvedorServico.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        servicoId: {
            type: DataTypes.BIGINT,
            references: {
                model: Servico,
                key: 'id',
            },
            allowNull: false,
        },
        provedorId: {
            type: DataTypes.BIGINT,
            references: {
                model: Provedor,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        tableName: 'provedor_servico',
        sequelize,
        timestamps: true,
    }
);

export default ProvedorServico;