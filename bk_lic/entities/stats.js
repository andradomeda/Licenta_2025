import db from "../dbConfig.js";
import { Sequelize } from "sequelize";
const Stats = db.define("Stats", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eldersHelped: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    totalDonations: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    activeVolunteers: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });
  
  export default Stats;
  