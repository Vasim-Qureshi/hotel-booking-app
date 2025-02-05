import { Router } from 'express';
import { Hotel } from '../models/Hotel';
const router = Router();

router.get('/', async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

router.get('/:id', async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
});

router.post('/', async (req, res) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json(hotel);
});

router.put('/:id', async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hotel);
});

router.delete('/:id', async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Hotel deleted' });
});

export default router;