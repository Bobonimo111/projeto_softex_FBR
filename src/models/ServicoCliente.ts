import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';
import Servico from './Servico'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas
import Cliente from './Cliente'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas

interface ServicoClienteAttributes {
    id: bigint;
    servicoId: bigint;
    clienteId: bigint;
}

class ServicoCliente extends Model<ServicoClienteAttributes> implements ServicoClienteAttributes {
    public id!: bigint;
    public servicoId!: bigint;
    public clienteId!: bigint;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ServicoCliente.init(
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
        clienteId: {
            type: DataTypes.BIGINT,
            references: {
                model: Cliente,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        tableName: 'servico_cliente',
        sequelize,
        timestamps: true,
    }
);

export default ServicoCliente;