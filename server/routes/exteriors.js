import express from 'express';
import exteriorsController from '../controllers/exteriors.js';

const router = express.Router();

router.get('/', exteriorsController.getExteriors);
router.get('/:id', exteriorsController.getExteriorByID);

export default router;