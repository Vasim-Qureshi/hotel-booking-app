import express from 'express';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/', getHotels );

router.get('/:id', getHotel);

router.post('/',createHotel);

router.put('/:id', updateHotel);

router.delete('/:id', deleteHotel);

const hotelRoutes = router;
export default hotelRoutes;