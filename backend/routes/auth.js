import express from 'express';
import User from '../models/User.js';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const router = express.Router();
router.use(bodyParser.json());
const jwtSecret = 'your_strong_secret_key'; 

router.post('/', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash password with bcrypt
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save(); // Use async/await for clarity
   
    
    const token = jwt.sign({userId: user._id }, jwtSecret, { expiresIn: '1h' }); // Generate JWT
    res.status(201).json({ message: 'User created successfully', token }); // Send JWT in response

  } catch (error) {
    console.error(error); // Log actual error
    res.status(500).json({ message: 'Account already exists' }); // Generic error message for user
  }
});


export default router;

