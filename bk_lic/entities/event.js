import { DataTypes } from "sequelize";
import db from "../dbConfig.js"; // corect
import Volunteer from "./volunteer.js"; // <--- asigură-te că importi modelul

const Event = db.define("Event", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending"
  },
  volunteerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "volunteers", // numele tabelului
      key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  tableName: "events"
});

export { Event };
