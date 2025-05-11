// associations.js
import Volunteer from "../entities/volunteer.js";
import Elder from "../entities/elder.js";
import Donation from "../entities/donation.js";
import { Event } from "../entities/event.js";
import GrandparentConnection from "../entities/grandparentConnection.js";
import VolunteerEvent from "../entities/volunteerEvent.js";


console.log("ASSOCIATION DEBUG:");
console.log("Volunteer:", Volunteer ? "OK" : "NOT LOADED");
console.log("Event:", Event ? "OK" : "NOT LOADED");
console.log("VolunteerEvent:", VolunteerEvent ? "OK" : "NOT LOADED");

Volunteer.belongsToMany(Event, {
  through: VolunteerEvent,
  foreignKey: "volunteerId",
  otherKey: "eventId"
});
Event.belongsToMany(Volunteer, {
  through: VolunteerEvent,
  foreignKey: "eventId",
  otherKey: "volunteerId"
});

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
