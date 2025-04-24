// dbConfig.js
import { Sequelize } from "sequelize";

const db = new Sequelize("db_licenta", "root", "root", {
  host: "localhost",
  dialect: "mariadb",
  logging: false, // opțional, dezactivează logurile SQL
});

export default db;
