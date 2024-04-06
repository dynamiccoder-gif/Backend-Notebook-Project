import express from 'express';
import User from '../models/User.js';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';
const router = express.Router();
router.use(bodyParser.json());


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
    const user = new User(req.body);
    await user.save(); // Use async/await for clarity
    console.log(`User created successfully: ${user.username}`);
    res.send({ message: 'User created successfully' }); // Informative response
  } catch (error) {
    console.error(error); // Log actual error
    res.status(500).json({ message: 'Account already exists' }); // Generic error message for user
  }
});


export default router;

