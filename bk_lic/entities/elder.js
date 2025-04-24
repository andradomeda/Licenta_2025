import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const ElderProfile = db.define("ElderProfile", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  clothingSize: {
    type: Sequelize.STRING,
    allowNull: true
  },
  shoeSize: {
    type: Sequelize.STRING,
    allowNull: true
  },
  hasPair: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  needs: {
    type: Sequelize.JSON, // modificat de la ARRAY la JSON
    allowNull: false
  }
});

export default ElderProfile;
