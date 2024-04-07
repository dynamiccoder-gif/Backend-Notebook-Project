import express from 'express';
import fetchuser from '../middlewares/fetchuser.js'
import Notes from '../models/Notes.js';


const router = express.Router();
//router:1 fetech notes for user
router.get('/fetchallNotes', fetchuser, async (req, res) => {
    const notes= await Notes.find( {user: req.user.userId});
    
    res.json(notes)
})
export default router;