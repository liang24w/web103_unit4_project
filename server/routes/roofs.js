import express from 'express';
import roofsController from '../controllers/roofs.js';

const router = express.Router();

router.get('/', roofsController.getRoofs);
router.get('/:id', roofsController.getRoofByID);

export default router;