import express from 'express';
import { authenticateToken } from '../middleware/authToken.js';
import Donation from '../entities/donation.js';

const router = express.Router();

// GET /donations
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.findAll();
        res.json(donations);
    } catch (error) {
        res.status(500).send(`Eroare la obtinere donatii: ${error.message}`);
    }
});

// POST /donations
router.post('/', async (req, res) => {
    try {
        console.log("Cerere POST /donations - body:", req.body);
        const donation = await Donation.create(req.body);
        res.status(201).json(donation);
    } catch (error) {
        console.error("Eroare la salvare donație:", error);
        res.status(500).send(`Eroare la înregistrare donație: ${error.message}`);
    }
});

// GET /donations/statistics
router.get('/statistics', async (req, res) => {
    try {
        const totalDonations = await Donation.count();
        const totalAmount = await Donation.sum('amount');

        res.json({
            totalDonations,
            totalAmount
        });
    } catch (error) {
        res.status(500).send(`Eroare la obtinere donatii: ${error.message}`);
    }
});

export default router;
