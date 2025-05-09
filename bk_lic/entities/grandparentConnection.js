import db from "../dbConfig.js";
import { Sequelize } from "sequelize";


const GrandparentConnection = db.define("GrandparentConnection", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  volunteer_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  elder_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  event_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATEONLY,
    allowNull: true  // conexiunea poate să nu fie încă încheiată
  },
  status: {
    type: Sequelize.ENUM("active", "terminated"),
    defaultValue: "active"
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  tableName: "grandparent_connections",
  timestamps: false
});

export default GrandparentConnection;
