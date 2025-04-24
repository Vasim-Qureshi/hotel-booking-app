import express from 'express';
import { createBooking, deleteBooking, getBooking, getBookings, updateBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', getBookings);

router.get('/:id', getBooking);

router.post('/', createBooking);

router.put('/:id', updateBooking);

router.delete('/:id', deleteBooking);

const bookingRoutes = router;
export default bookingRoutes;