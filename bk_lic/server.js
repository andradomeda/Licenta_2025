// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import donationRoutes from './routes/donationRoutes.js'; 
import elderRoutes from "./routes/elderRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import connectionRoutes from './routes/connectionRoutes.js';





dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware-uri
app.use(cors()); // permite cereri din alte domenii (ex: frontend-ul pe 5173)
app.use(express.json()); // ca să putem citi JSON-ul din request body

// Rutele tale
app.use("/users", authRoutes);
app.use("/volunteers", volunteerRoutes);
app.use('/donations', donationRoutes);
app.use("/elders", elderRoutes);
app.use("/events", eventRoutes);
app.use('/connections', connectionRoutes); 

// Pornire server
app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe http://localhost:${PORT}`);
});
