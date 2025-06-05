import express from 'express';
import { upload } from '../middleware/upload.js';
const router = express.Router();

import { createUser, checkUsername } from '../controllers/userController.js';

router.post('/create-user',upload.single('profilePhoto'), createUser);
router.post('/check-username', checkUsername);

export default router;


