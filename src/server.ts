import express, { Router } from "express";
import dotenv from "dotenv"
import { join } from "path";
//Importação de rotas
//Nomeando a rota user como userRouter para ser usada no main
import userRouter from "./routes/user";
import dataBase from "./models/dataBase";

//Iniciando a apliação
const app = express();
//Configurando as variaveis de ambiente
dotenv.config()

//Configuração de arquivos de renderização
app.set("view engine", "ejs");
app.set("views", join(__dirname, "/views"));

//Configuração de arquivos estaticos
app.use("/static", express.static(join(__dirname, "public")));

//Configuração de rotas
app.use("/user", userRouter);

//Inicia o servidor
app.listen(process.env.port, () => {
    dataBase.authenticate()
        .then(() => {
            console.log('Conexão com o banco de dados estabelecida com sucesso.');
            return dataBase.sync(); // Sincroniza os modelos
        })
        .then(() => {
            console.log('Modelos sincronizados com o banco de dados.');
            console.log(`Servidor rodando na porta ${process.env.port}`);
        })
        .catch(error => {
            console.error('Erro ao conectar-se ao banco de dados:', error);
        });
    //console.log("Inicando servidor!, http://localhost:" + process.env.port);
});