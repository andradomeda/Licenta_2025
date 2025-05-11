// routes/eventRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/authToken.js';
import { Event } from '../entities/event.js';
import Volunteer from '../entities/volunteer.js';
import VolunteerEvent from "../entities/volunteerEvent.js";

const router = express.Router();

// 1. GET toate evenimentele (indiferent de status)
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET doar evenimentele cu status 'accepted'
router.get('/accepted', async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { status: 'accepted' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, startDate, endDate, status, volunteerId } = req.body;

    // Verificare opțională: există voluntarul?
    const volunteer = await Volunteer.findByPk(volunteerId);
    if (!volunteer) {
      return res.status(400).json({ error: 'Voluntar inexistent' });
    }
    const newEvent = await Event.create({
      name,
      description,
      startDate,
      endDate,
      status: status || 'pending',
      volunteerId
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 4. PATCH - actualizare eveniment după ID
router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, status } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Actualizează doar câmpurile trimise (fără id)
    await event.update({
      name: name ?? event.name,
      description: description ?? event.description,
      startDate: startDate ?? event.startDate,
      endDate: endDate ?? event.endDate,
      status: status ?? event.status
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//creere legatura intre eveniment si participant
router.post("/:id/participate", authenticateToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const volunteerId = req.user.id;

    // verificăm dacă deja există participare
    const alreadyJoined = await VolunteerEvent.findOne({
      where: { volunteerId, eventId }
    });

    if (alreadyJoined) {
      return res.status(400).json({ message: "Already participating in this event" });
    }
    console.log("body primit:", req.body);
    await VolunteerEvent.create({ volunteerId, eventId });
    res.status(201).json({ message: "Participation confirmed" });
  } catch (err) {
    console.error("Eroare participare:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
