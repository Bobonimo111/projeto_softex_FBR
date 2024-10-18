/*
Agendamento vai ser composto no esquema de 
Ambos precisam confirmar para o agendamento ser valido logo ele precisa de estados como aguardando ou efetuado;
Se cliente e repositor, não chegarem a um acordo o agendamento não sera realizado;
*/
import { DataTypes, Model } from 'sequelize';
import { sequelize } from './DataBase';
import Servico from './Servico'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas
import Cliente from './Cliente'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas
import Provedor from './Provedor'; // Certifique-se de ajustar o caminho conforme sua estrutura de pastas

interface AgendamentoAttributes {
    id: bigint;
    data: Date;
    hora: string;
    servicoId: bigint;
    clienteId: bigint;
    provedorId: bigint;
}

class Agendamento extends Model<AgendamentoAttributes> implements AgendamentoAttributes {
    declare id: bigint;
    declare data: Date;
    declare hora: string;
    declare servicoId: bigint;
    declare clienteId: bigint;
    declare provedorId: bigint;

    // timestamps
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Agendamento.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false,
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
        tableName: 'agendamento',
        sequelize,
        timestamps: true,
    }
);

export default Agendamento;