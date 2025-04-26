// syncDb.js
import db from "./dbConfig.js"; // conexiunea la baza de date
import volunteer from "./entities/volunteer.js"; // modelul User
import connection from "./entities/connection.js"; // modelul User
import donation from "./entities/donation.js"; // modelul User
import elder from "./entities/elder.js"; // modelul User
import event from "./entities/event.js"; // modelul User


async function syncDatabase() {
  try {
    await db.authenticate();
    console.log("✅ Conexiune reușită la baza de date.");

    // Sincronizează toate modelele definite
    await db.sync({ alter: true }); // alter: true va modifica tabelele existente
    console.log("✅ Baza de date sincronizată cu succes.");
  } catch (error) {
    console.error("Eroare la sincronizarea bazei de date:", error);
  } finally {
    await db.close(); // închide conexiunea după sincronizare
  }
}

syncDatabase();
