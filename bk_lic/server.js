// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware-uri
app.use(cors()); // permite cereri din alte domenii (ex: frontend-ul pe 5173)
app.use(express.json()); // ca să putem citi JSON-ul din request body

// Rutele tale
app.use("/users", authRoutes);

// Pornire server
app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe http://localhost:${PORT}`);
});
