import express from 'express';
import {getExteriors,
    getExteriorByID,
    getInteriors,
    getInteriorByID,
    getRoofs,
    getRoofByID,
    getWheels,
    getWheelByID} from '../controllers/customController.js';

const router = express.Router();

router.get('/', getExteriors);
router.get('/:id', getExteriorByID);
router.get('/', getInteriors);
router.get('/:id', getInteriorByID);
router.get('/', getRoofs);
router.get('/:id', getRoofByID);
router.get('/', getWheels);
router.get('/:id', getWheelByID);

export default router;