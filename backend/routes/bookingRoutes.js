const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/', async (req, res) => {
  const bookings = await Booking.find().populate('user hotel');
  res.json(bookings);
});

router.get('/:id', async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('user hotel');
  res.json(booking);
});

router.post('/', async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

router.put('/:id', async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(booking);
});

router.delete('/:id', async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
});

module.exports = router;