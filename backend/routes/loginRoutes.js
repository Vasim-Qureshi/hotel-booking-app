import express from 'express';
import {getLogin} from '../controllers/authController.js';

const router = express.Router();

router.post('/',getLogin);

const loginRoutes = router;
export default loginRoutes;