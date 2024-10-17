import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';
import Cliente from './Cliente'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas
import Provedor from './Provedor'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas
import Agendamento from './Agendamento'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas

interface MensagemAttributes {
    id: bigint;
    mensagem: string;
    clienteId: bigint;
    provedorId: bigint;
    agendamentoId: bigint;
}

class Mensagem extends Model<MensagemAttributes> implements MensagemAttributes {
    public id!: bigint;
    public mensagem!: string;
    public clienteId!: bigint;
    public provedorId!: bigint;
    public agendamentoId!: bigint;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Mensagem.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        mensagem: {
            type: DataTypes.STRING(255),
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
        provedorId: {
            type: DataTypes.BIGINT,
            references: {
                model: Provedor,
                key: 'id',
            },
            allowNull: false,
        },
        agendamentoId: {
            type: DataTypes.BIGINT,
            references: {
                model: Agendamento,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        tableName: 'mensagem',
        sequelize,
        timestamps: true,
    }
);

export default Mensagem;