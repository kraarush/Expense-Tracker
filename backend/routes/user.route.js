import express from 'express'
import { home } from '../controllers/user.controller.js';

const router = express.Router();
    

// routes
router.route('/home').get(home);

export default router;