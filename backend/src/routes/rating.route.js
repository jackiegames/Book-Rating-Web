import { Router } from 'express';
import { createRating, getRatings } from '../controllers/rating.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/createRating', verifyToken, createRating);
router.get('/getRatings', verifyToken, getRatings);


export default router;