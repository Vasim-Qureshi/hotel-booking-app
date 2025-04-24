import express from 'express';
import { createResister} from '../controllers/authController.js';

const router = express.Router();

router.post('/', createResister);

const authRoutes = router;
export default authRoutes;