### 07/10/2024 Segunda-feira
>
> Parei quando iria integrar as configurações dos controladores de login para cliente entre o router e o server principal
>
#
>
> Alem que tambem iria testar se a rota esta puxando corretamente por email para login;

### 08/10/2024 Terca-feira
>
> Densenvolvida a parte de criptografia de senha para cliente e cadastro

><div style="color:red">Definir o envio de email do ADM para o provedor cadastrado confirmando um cadastro<div>
>
#
>
> definido o middlewares basicos para sessões das três entidades

> definido apenas um ADM logado pode cadastrar um provedor

### 09/10/2024
>
>Definir o agendamento como uma parte intermediaria antes de ser lançada no cronograma oficial é uma parte importante, já que o agendamento é um ato e o cronograma seria colocar esse ato no papel ou seja agendar;

> inicar o desenvolvimento do ADM
> Etapas inicais da criação do Model para administrador

> Apenas uns mapa pra eu me seguir onde eu estou
![permissão de criação](Diario%20de%20desenvolvimento/permissoes%20de%20criacao.png)
![solicitação cliente fornecedor](Diario%20de%20desenvolvimento/Soliciatacao%20cliente%20forncedor.png)

### 12/10/2024
>
>Inicou o desenvolvimento do sistema de envios de emails
>
>Configurando credenciais Oauth API

### 14/10/2024
>
>Sigo buscando um servidor de emails gratuito que eu posssa utilizar para testes, todos os que eu encontro ou nescessitam de autenticação ou são pagos.
>
>Após muita luta consegui enviar um email de forma automatica usando o <https://app.mailersend.com/domains/o65qngkn7yjgwr12>;
>Iniciado rotas para agendamento de serviço
>
### 15/10/2024
>
>Rota de agendamento em desenvolvimento, vou pular a etapa de verificar se os campos estão escritos de formas correta para poupar tempo.
>
>Rota para solicitar novo agendamento esta pronto agora preciso do banco para testar.
![Fluxo para telas](Diario%20de%20desenvolvimento/Fluxo%20de%20telas.png)

### 18/10/2024
>
>Ontem foram aplicadas os modelos do banco dados no codigo, implementei todos que foram enviado a mim por antonio.
>
>Hoje estou fazendo a refatoração das rotas, para suportar os modelos
>
>Vou desenvolver uma função generica pra login e cadastro de administrador, provedor e cliente
>Função generica finalizada proximo passo passa ser,

- O crud para os serviços;
- Requisição de agendamentos;
- Reposta de agendamento;
- Retorno do cronograma para o fornecedor e visualização para o cliente;

### 23/10/2024
>
>Hoje finalizei o crud de serviços, sei que não é uma boa pratica fazer um commit desse tamanho, mas foi oq deu pra fazer agora;
>Agora vou pra parte de agendamentos, tenho de pensar em como vai funcionar a logica e os dados que seram envolvidos;

### 27/10/2024
>
>Nesse meio tempo iniciei a parte de agendamentos, tive alguns contra tempo com a questão do banco de dados, o projeto já perdeu a infraestrutura a muito tempo e tenho até dia 30, entregar uma parte do projeto funcionando.
>Vou finalizar hoje a questão de agendamentos e realizar um mapeamento nas rotas
