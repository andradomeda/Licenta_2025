import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Event = db.define("Event", {
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
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATEONLY,
    allowNull: true  // poate fi null dacă e eveniment de o zi
  },
  creation_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: Sequelize.ENUM("pending", "approved", "rejected"),
    allowNull: false,
    defaultValue: "pending"
  },
  approved_by: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: "volunteers",
      key: "id"
    }
  }
}, {
  tableName: "events",
  timestamps: false
});

export default Event;
