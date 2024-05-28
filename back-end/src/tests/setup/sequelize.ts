import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";
import Fatura from "../../db/models/faturaModel";

config({ path: ".env.test" });

const sequelize = new Sequelize({
  dialect: "postgres",
  models: [Fatura],
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
});

sequelize.addModels([Fatura]);

export default sequelize
