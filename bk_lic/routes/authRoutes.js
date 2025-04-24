import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../entities/user.js";

const router = express.Router();

// POST /register - Înregistrare utilizator
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, role, city } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).send("Emailul este deja folosit.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      city
    });

    res.status(201).json({ message: "Utilizator înregistrat cu succes!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Eroare la înregistrare");
  }
});

// POST /login - Autentificare
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("Utilizator inexistent");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).send("Parolă greșită");

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Eroare la autentificare");
  }
});

export default router;
