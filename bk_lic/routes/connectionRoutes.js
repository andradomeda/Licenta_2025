import express from 'express';
import GrandparentConnection from '../entities/grandparentConnection.js';
import Elder from '../entities/elder.js';
import Volunteer from '../entities/volunteer.js';
import { authenticateToken } from '../middleware/authToken.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { volunteer_id, elder_id, event_id, start_date, end_date } = req.body;

  try {
    // Verifică existența voluntarului și a bătrânului
    const volunteer = await Volunteer.findByPk(volunteer_id);
    const elder = await Elder.findByPk(elder_id);

    if (!volunteer || !elder) {
      return res.status(404).json({ error: 'Volunteer sau Elder inexistent' });
    }

    // Creează conexiunea
    const connection = await GrandparentConnection.create({
      volunteer_id,
      elder_id,
      event_id,
      start_date,
      end_date: end_date || null,
      status: 'active',
      updated_at: new Date()
    });

    // Actualizează voluntarul și elder-ul
    if (!volunteer.has_paired_elder) {
      await volunteer.update({ has_paired_elder: true });
    }
    if (!elder.has_pair) {
      await elder.update({ has_pair: true });
    }

    res.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// PATCH /connections/:id/end
router.patch('/:id/end', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { end_date } = req.body;
  
    try {
      const connection = await GrandparentConnection.findByPk(id);
  
      if (!connection) {
        return res.status(404).json({ error: 'Conexiune inexistentă' });
      }
  
      await connection.update({
        end_date,
        status: 'terminated',
        updated_at: new Date()
      });
  
      res.json({ message: 'Conexiunea a fost încheiată cu succes', connection });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // GET /connections/event/:eventId
router.get('/event/:eventId', authenticateToken, async (req, res) => {
    const { eventId } = req.params;
  
    try {
      const connections = await GrandparentConnection.findAll({
        where: { event_id: eventId }
      });
  
      res.json(connections);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

export default router;
