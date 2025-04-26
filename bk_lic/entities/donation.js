import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Donation = db.define("Donation", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  logged_by: {
    type: Sequelize.INTEGER,
    allowNull: false
    // FK către Volunteer.id, se poate seta prin asociere
  },
  type: {
    type: Sequelize.ENUM("clothing", "money", "food", "medicine", "other"),
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true // se setează doar dacă type === 'money'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  received_date: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  tableName: "donations",
  timestamps: false
});

export default Donation;
