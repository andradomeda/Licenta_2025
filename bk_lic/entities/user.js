import db from "../dbConfig.js"
import { Sequelize } from "sequelize";

const User = db.define("User", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM("elder", "elder_helper", "volunteer", "ngo", "admin"),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hasPairedElder: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    totalEldersAdopted: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    eventsAttended: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }, 
    isActive:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
  });
  
  export default User;