import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Volunteer from "../entities/volunteer.js";

const router = express.Router();

// POST /register - Înregistrare voluntar
router.post("/register", async (req, res) => {
  try {
    let {
      type,
      name,
      email,
      password,
      phone_number,
      city,
      county,
      sending_ngo
    } = req.body;

    // Dacă nu s-a trimis 'type', îl setăm implicit aici
    if (!type) {
      type = "simple";
    }

    const existingVolunteer = await Volunteer.findOne({ where: { email } });
    if (existingVolunteer)
      return res.status(400).send("Emailul este deja folosit.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVolunteer = await Volunteer.create({
      type,
      name,
      email,
      password: hashedPassword,
      phone_number,
      city,
      county,
      sending_ngo
      // has_paired_elder, is_active, date_joined rămân autocompletate de Sequelize
    });

    res.status(201).json({ message: "Voluntar înregistrat cu succes!" });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Eroare la înregistrare: ${error.message}`);
  }
});

// POST /login - Autentificare voluntar
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await Volunteer.findOne({ where: { email } });
    if (!volunteer) return res.status(400).send("Voluntar inexistent");

    const match = await bcrypt.compare(password, volunteer.password);
    if (!match) return res.status(403).send("Parolă greșită");

    const accessToken = jwt.sign(
      { id: volunteer.id, type: volunteer.type },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Eroare la înregistrare: ${error.message}`);

  }
});

export default router;
