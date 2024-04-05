import express from 'express';

const router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: "Notes Registration successful" });
})
export default router;