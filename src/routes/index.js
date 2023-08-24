import express from 'express';
import routeLaunchers from '../routes/launchers.route.js';

const router = express.Router();

router.use('/api', routeLaunchers);

export default router;
