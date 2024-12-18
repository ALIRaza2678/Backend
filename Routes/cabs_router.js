import express from 'express';
import { createVehicle, getAllVehicles, getVehicleById, updateVehicle, deleteVehicle, bookVehicle, unbookVehicle } from '../Controller/cabs_controller.js';

const router = express.Router();

// Route to create a new vehicle
router.post('/', createVehicle);

// Route to get all vehicles
router.get('/', getAllVehicles);

// Route to get a vehicle by ID
router.get('/:id', getVehicleById);

// Route to update vehicle information
router.put('/:id', updateVehicle);

// Route to delete a vehicle
router.delete('/:id', deleteVehicle);

// Route to book a vehicle
router.patch('/:id/book', bookVehicle);

// Route to unbook a vehicle
router.patch('/:id/unbook', unbookVehicle);

export default router;
