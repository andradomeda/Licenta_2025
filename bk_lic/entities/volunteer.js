import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Volunteer = db.define("Volunteer", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM("simple", "admin"),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  county: {
    type: Sequelize.STRING,
    allowNull: false
  },
  has_paired_elder: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  date_joined: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  sending_ngo: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  tableName: "volunteers",
  timestamps: false // dacă nu vrei createdAt/updatedAt automat
});

export default Volunteer;
