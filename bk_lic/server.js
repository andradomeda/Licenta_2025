import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/authRoutes.js"; // Doar o singură dată

const app = express();

app.use(express.json());
app.use("/users", authRoutes); // Ruta de autentificare

app.listen(3000, () => {
  console.log("Serverul rulează pe http://localhost:3000");
});
