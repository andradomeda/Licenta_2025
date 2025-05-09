import { DataTypes } from "sequelize";
import db from "../dbConfig.js";
import Volunteer from "./volunteer.js";

const Donation = db.define("Donation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "RON",
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  donorName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  donorEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  donorPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Donation;
