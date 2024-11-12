# projeto_softex_FBR

> Projeto criado com intuito de servir como a finalização da terceira edição do FAP pernambuco.

## CONFIGURAÇÕES INICIAIS

`npm install`
Para instalar todas as dependencias

Modificar o arquivo .env.exemplo, é recomendado definir a variavel PORT como 3000.

acessar a documentação dos [end-points](<http://localhost:3000/docs/>)

## Teste

1 - criar uma conta de adm

2 - logar como adm e copiar o hash

3 - criar um serviço, enviado o hash no cabecalho

4 - criar um provedor

5 - definir o serviço para o provedor, passando o id do serviço e do provedor ou provedores.

6 - criar um cliente.

7 - realizar um agendamento passando o id de cliente e serviço.

8 - se tiver tudo ok o provedor ira receber um email, avisando para entrar em contato com o cliente.

<span style="color:red;">Um email sera enviado ao primeiro provedor que for encontrado com esse serviço</span>

## Comandos

## `npm install`

Instala as dependencias necessarias para iniciar o projeto

### `npm run dev`

para iniciar o servidor em estado de desenvolvimento.

### `npm run build`

compilar o codigo para produção, para ser utilizado com node.

### `npm start`

Iniciar o servidor em produção, deve ser compilado antes

-----

## ROTAS

Para visualizar os end-points acessar
dependo da porta que for definida no .env
<http://localhost:3000/docs/>
