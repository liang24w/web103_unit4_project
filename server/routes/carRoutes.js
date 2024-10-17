import express from 'express';
// import controller for cars
import carsController from '../controllers/cars.js';

const router = express.Router();

// define routes to get, create, edit, and delete cars
router.get('/', carsController.getCars);
router.get('/:id', carsController.getCarByID);
router.post('/', carsController.createCar);
router.delete('/:id', carsController.deleteCar);
router.patch('/:id', carsController.updateCar);

export default router;