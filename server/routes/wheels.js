import express from 'express';
import wheelsController from '../controllers/wheels.js';

const router = express.Router();

router.get('/', wheelsController.getWheels);
router.get('/:id', wheelsController.getWheelByID);

export default router;