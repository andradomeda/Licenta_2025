import db from "../dbConfig.js";
import { Sequelize } from "sequelize";
import { DataTypes } from 'sequelize';
import Volunteer from './volunteer.js';
import GrandparentConnection from "./grandparentConnection.js";

const Elder = db.define("Elder", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  clothing_size: {
    type: DataTypes.STRING,
    allowNull: true
  },
  shoe_size: {
    type: DataTypes.STRING,
    allowNull: true
  },
  has_pair: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  joined_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  needs: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "elders",
  timestamps: false
});

export default Elder;
