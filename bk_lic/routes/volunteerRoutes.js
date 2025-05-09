import express from "express";
import Volunteer from "../entities/volunteer.js";
import { authenticateToken } from '../middleware/authToken.js';

const router = express.Router();

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

export default router;
