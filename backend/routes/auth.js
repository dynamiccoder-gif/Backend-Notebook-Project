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

router.post('/login',
[body('email').isEmail().withMessage('Invalid email format'),body('password').exists()]
, async (req, res) => {  
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors
  }


  try {
    const user = await User.findOne({ email: req.body.email})
    if(!user){
      return res.status(401).json({message:'Invalid credentials'})}
      const passwordMatch = await bcrypt.compare(req.body.password, user.password); // Compare hashed password with plaintext password using bcrypt's compare function
      if(!passwordMatch){
        return res.status(401).json({message:'Invalid credentials'})
      }
      
         const token = jwt.sign({userId: user._id }, jwtSecret, { expiresIn: '1h' })
         res.json(token); // Generate JWT
      }
    
    catch(error)
    {console.log(error)
    res.status(500).json({message:'Internal server error'})}
}
  
)


export default router;

