import express from 'express';
import User from '../models/User.js';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());


router.post('/', (req, res) => {
    const user=User(req.body);
    user.save();
    console.log(10);
     console.log(req.body)
    res.send(req.body);
})
export default router;

