import express from 'express';
import interiorsController from '../controllers/interiors.js';

const router = express.Router();

router.get('/', interiorsController.getInteriors);
router.get('/:id', interiorsController.getInteriorByID);

export default router;