import User from "../models/User.js";
import  hashedPassword from 'bcryptjs';

const {hash} = hashedPassword;

export const getUsers = async (req, res) => {
  try {
    
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const CreatedUserData = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User Created', CreatedUserData });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const updatedUserData = await User.findByIdAndUpdate(req.params.id, { name, email, password: hashedPassword }, { new: true });
    res.json({ message: 'User updated', updatedUserData });  
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deletedUserData = await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted', deletedUserData });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}