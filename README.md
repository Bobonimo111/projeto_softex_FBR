# projeto_softex_FBR

> Projeto criado com intuito de servir como a finalização da terceira edição do FAP pernambuco.

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

**Todas as rotas seguem pelo seu caminho default**.
_**Exemplo /adminitrador/login**_

- DEV : EM desenvolvimento
- OK : Tudo funcionando
- CAMPO VAZIO : nada foi feito para essa rota

### cliente

| ROTA | TIPO | PARAMETROS |STATUS|OQ FALTA|
|------|------|-------|-------|-------|
|/cadastrar      |POST      |BODY: nome, cpf, sexo,  email, senha, cnpj|OK||
|/login   |POST     |BODY:email,senha |DEV|Criar sessão ao logar|

### provedor

| ROTA | TIPO | PARAMETROS |STATUS|OQ FALTA|
|------|------|-------|-------|-------|
|/cadastrar      |POST      |BODY: nome, cpf, sexo,  email, senha, cnpj|DEV|Definir que Apenas um adm poder um provedor|
|/login   |POST     |BODY:email,senha |DEV|Criar sessão ao logar|
|/cronograma   |GET     |HEAD:Authorization token, provedorId |DEV|CRIAR|

### administrador

| ROTA | TIPO | PARAMETROS |STATUS|OQ FALTA|
|------|------|-------|-------|-------|
|/cadastrar      |POST      |BODY: nome, cpf, sexo,  email, senha, cnpj|DEV|Definir que Apenas um adm poder criar outro adm|
|/login   |POST     |BODY:email,senha |DEV|Criar sessão ao logar|

### servico

| ROTA | TIPO | PARAMETROS |STATUS|OQ FALTA|
|------|------|-------|-------|-------|
|/cadastrar      |POST      |BODY:nome,descricao|OK||
|/get   |PUT      |NONE|OK||
|/get/:id      |PUT   |URL:servicoId     |OK||
|/editar      |PUT   |BODY:nome?,descricao?|OK||
|/deletar      |PUT   |BODT:provedorId,servicoId|OK||

### agendamento

| ROTA | TIPO | PARAMETROS |STATUS|
|------|------|-------|-------|
|/novo      |POST      |BODY: data,hora,servicoId,clienteId |OK|
|/   |PUT      |BODY: data,hora,servicoId,clienteId       ||
|/cancelar/:id      |PUT   |URL:agedamentoId      ||
