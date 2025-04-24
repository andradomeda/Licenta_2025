import db from "../dbConfig.js";
import { Sequelize } from "sequelize";
const Donation = db.define("Donation", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    donorId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM("clothing", "money", "food", "medicine", "other"),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
  
  export default Donation;
  