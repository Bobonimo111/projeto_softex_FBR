import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "mysql",
    username: "fbr_user",
    password: "fbrPass",
    database: "fbr_user",
    host: "localhost",
    port: 3306
})
// export const sequelize = new Sequelize("BANCO DE DADOS", "USUARIO", "SENHA", {
//     dialect: "TIPO DE BANCO",
//     host: "ENDEREÇO",
//     port: PORTA DE ACESSO
// })
