// associations.js
import Volunteer from "../entities/volunteer.js";
import Elder from "../entities/elder.js";
import Donation from "../entities/donation.js";
import { Event } from "../entities/event.js";
import GrandparentConnection from "../entities/grandparentConnection.js";

Volunteer.hasMany(Event, { foreignKey: "volunteerId" });
Event.belongsTo(Volunteer, { foreignKey: "volunteerId" });

// Volunteer <-> Donation
Donation.belongsTo(Volunteer, { foreignKey: "volunteerId" });
Volunteer.hasMany(Donation, { foreignKey: "volunteerId" });

// Volunteer <-> GrandparentConnection
Volunteer.hasMany(GrandparentConnection, { foreignKey: "volunteer_id" });
GrandparentConnection.belongsTo(Volunteer, { foreignKey: "volunteer_id" });

// Elder <-> GrandparentConnection
Elder.hasMany(GrandparentConnection, { foreignKey: "elder_id" });
GrandparentConnection.belongsTo(Elder, { foreignKey: "elder_id" });

// Event <-> GrandparentConnection (opțional dacă vrei legătura asta)
Event.hasMany(GrandparentConnection, { foreignKey: "event_id" });
GrandparentConnection.belongsTo(Event, { foreignKey: "event_id" });
