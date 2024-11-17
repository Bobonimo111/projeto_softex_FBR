import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
})
// export const sequelize = new Sequelize("fbrDb", "docker", "fbrpass", {
//     dialect: "postgres",
//     host: "127.0.0.1",
//     port: 5433
// })
