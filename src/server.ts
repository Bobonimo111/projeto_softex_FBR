import express, { Router } from "express";
import dotenv from "dotenv"
import { join } from "path";
import session from "express-session";

//Conecção com o banco de dados 
import { sequelize } from "./models/dataBase";

//Importação de rotas
//Nomeando a rota user como clieteRouter para ser usada no main
import clienteRouter from "./routes/cliente";
import provedorRouter from "./routes/provedor"

//Iniciando a apliação
const app = express();
//Configurando as variaveis de ambiente
dotenv.config();

//configuração de leitura de json
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//Configuração de arquivos de renderização
app.set("view engine", "ejs");
app.set("views", join(__dirname, "/views"));

//Configuração de arquivos estaticos
app.use("/static", express.static(join(__dirname, "public")));


//Configuração de sessão
app.use(session({
    secret: "Frase secreta",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000 // 1 hora de sessão
    }
}));

//Configuração de rotas
app.use("/cliente", clienteRouter);
app.use("/provedor", provedorRouter)

//Inicia o servidor
app.listen(process.env.port, () => {
    sequelize.authenticate()
        .then(() => {
            console.log('Conexão com o banco de dados estabelecida com sucesso.');
            return sequelize.sync(); // Sincroniza os modelos
        })
        .then(() => {
            console.log('Modelos sincronizados com o banco de dados.');
            console.log(`Servidor rodando  http://localhost:${process.env.port}`);
        })
        .catch(error => {
            console.error('Erro ao conectar-se ao banco de dados:', error);
        });
    //console.log("Inicando servidor!, http://localhost:" + process.env.port);
});