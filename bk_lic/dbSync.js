import db from "./dbConfig.js";
import volunteer from "./entities/volunteer.js"; 
import elder from "./entities/elder.js"; 
import grandparentConnection from "./entities/grandparentConnection.js"; 
import donation from "./entities/donation.js"; 
import { Event} from "./entities/event.js";
import "./Associations/associations.js";


async function dbSync() {
  try {
    await db.authenticate();
    console.log(" Conexiune reușită la baza de date.");

    // Sincronizează toate modelele definite
    await db.sync({ alter: true }); // alter: true va modifica tabelele existente
    console.log(" Baza de date sincronizată cu succes.");
  } catch (error) {
    console.error("Eroare la sincronizarea bazei de date:", error);
  } finally {
    await db.close(); // închide conexiunea după sincronizare
  }
}

dbSync();
