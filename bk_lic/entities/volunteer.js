import { DataTypes } from "sequelize";
import db from "../dbConfig.js";
import Elder from "./elder.js";
import { Event } from "./event.js";
import GrandparentConnection from "./grandparentConnection.js";

const Volunteer = db.define("Volunteer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM("simple", "admin"),
    allowNull: false,
    defaultValue: "simple"
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  county: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active"
  },
  has_paired_elder: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  date_joined: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  sending_ngo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "volunteers",
  timestamps: false
});

export default Volunteer;
