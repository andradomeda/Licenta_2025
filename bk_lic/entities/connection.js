import db from "../dbConfig.js";
import { Sequelize } from "sequelize";
const GrandparentConnection = db.define("GrandparentConnection", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    volunteerId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    elderId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    
  });
  
  export default GrandparentConnection;
  