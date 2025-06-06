import express from "express";
import Volunteer from "../entities/volunteer.js";
import { authenticateToken } from '../middleware/authToken.js';
import { Event } from "../entities/event.js"; // sau calea corectă către modelul tău Event
import VolunteerEvent from "../entities/volunteerEvent.js"; // asigură-te că ai importat corect

const router = express.Router();

router.get("/active", async (req, res) => {
  try {
    const activeVolunteers = await Volunteer.findAll({
      where: { status: "active" }
    });

    res.status(200).json(activeVolunteers);
  } catch (error) {
    console.error("Eroare la preluarea voluntarilor activi:", error);
    res.status(500).json({ message: "Eroare server", error });
  }
});

router.get("/me", authenticateToken, async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.user.id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Endpoint pentru a obține un voluntar după ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const volunteer = await Volunteer.findByPk(id); // căutare după primary key

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json(volunteer); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  const {
    type,
    phone,
    city,
    county,
    status,
    has_paired_elder,
    sending_ngo
  } = req.body;

  try {
    const volunteer = await Volunteer.findByPk(id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    await volunteer.update({
      type: type ?? volunteer.type,
      phone: phone ?? volunteer.phone,
      city: city ?? volunteer.city,
      county: county ?? volunteer.county,
      status: status ?? volunteer.status,
      has_paired_elder: has_paired_elder ?? volunteer.has_paired_elder,
      sending_ngo: sending_ngo ?? volunteer.sending_ngo
    });

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

console.log("Volunteer:", Volunteer ? "OK" : "NOT LOADED");
console.log("Event:", Event ? "OK" : "NOT LOADED");
console.log("VolunteerEvent:", VolunteerEvent ? "OK" : "NOT LOADED");

router.get("/me/events", authenticateToken, async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.user.id, {
      include: {
        model: Event,
        through: { attributes: [] } // exclude coloanele din tabelul intermediar
      }
    });

    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

    res.json(volunteer.Events);
  } catch (err) {
    console.error("Eroare la obținerea evenimentelor:", err);
    res.status(500).json({ error: "Server error" });
  }
});



export default router;
