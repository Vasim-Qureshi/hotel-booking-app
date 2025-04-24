import User from "../models/User.js";
import bcryptjs_pkg from 'bcryptjs';
import pkg_jsonwebtoken from 'jsonwebtoken';

const {hash,compare}=bcryptjs_pkg;
const { sign } = pkg_jsonwebtoken;

export const createResister = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json(user);
  }

export const getLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await compare(password, user.password)) {
      const token = sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials from authController' });
    }
  }