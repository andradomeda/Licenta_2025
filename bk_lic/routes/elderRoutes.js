import express from 'express';
import { authenticateToken } from '../middleware/authToken.js';
import Elder from '../entities/elder.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const elders = await Elder.findAll(); // fără include
        res.json(elders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
  try {
    const elderId = req.params.id;
    const elder = await Elder.findByPk(elderId);

    if (!elder) {
      return res.status(404).json({ message: 'Elder not found' });
    }

    res.json(elder);
  } catch (error) {
    console.error('Eroare la găsirea elderului:', error);
    res.status(500).json({ error: 'Eroare de server' });
  }
});


// router.get('/locations', async (req, res) => {
//     try {
//         const locations = await Elder.findAll({
//             attributes: ['city', 'county', 'lat', 'lng'],
//             group: ['city', 'county', 'lat', 'lng'],
//             raw: true
//         });

//         const locationCounts = await Elder.findAll({
//             attributes: ['city', 'county', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
//             group: ['city', 'county'],
//             raw: true
//         });

//         const result = locations.map(location => {
//             const count = locationCounts.find(
//                 lc => lc.city === location.city && lc.county === location.county
//             );
//             return { ...location, count: count ? count.count : 0 };
//         });

//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

router.post('/', authenticateToken, async (req, res) => {
    try {
        const elder = await Elder.create(req.body);
        res.status(201).json(elder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  // Extragem doar câmpurile care pot fi modificate (fără id, name, joined_date, updated_at)
  const {
    phone,
    city,
    county,
    street,
    birth_date,
    description,
    clothing_size,
    shoe_size,
    has_pair,
    lat,
    lng,
    needs
  } = req.body;

  try {
    const elder = await Elder.findByPk(id);
    if (!elder) {
      return res.status(404).json({ message: 'Elder not found' });
    }

    await elder.update({
      phone: phone ?? elder.phone,
      city: city ?? elder.city,
      county: county ?? elder.county,
      street: street ?? elder.street,
      birth_date: birth_date ?? elder.birth_date,
      description: description ?? elder.description,
      clothing_size: clothing_size ?? elder.clothing_size,
      shoe_size: shoe_size ?? elder.shoe_size,
      has_pair: has_pair ?? elder.has_pair,
      lat: lat ?? elder.lat,
      lng: lng ?? elder.lng,
      needs: needs ?? elder.needs,
      updated_at: new Date()
    });

    res.json(elder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
