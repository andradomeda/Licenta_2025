// VolunteerEvent.js
import { DataTypes } from "sequelize";
import db from "../dbConfig.js";

const VolunteerEvent = db.define("VolunteerEvent", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  volunteerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "volunteers",
      key: "id"
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "events",
      key: "id"
    }
  }
}, {
  tableName: "volunteer_events",
  timestamps: false
});

export default VolunteerEvent;
