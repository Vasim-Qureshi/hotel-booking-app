import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/userController.js';

const routes = express.Router();

routes.get('/', getUsers);

routes.get('/:id',getUser);

routes.post('/', createUser);

routes.put('/:id', updateUser);

routes.delete('/:id', deleteUser);

const userRoutes = routes;
export default userRoutes;