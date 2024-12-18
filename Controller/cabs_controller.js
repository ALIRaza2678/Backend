import Vehicle from '../Model/cabs_model.js';

// Create a new vehicle
export const createVehicle = async (req, res) => {
    try {
        console.log(req.body); // Log the incoming body to verify it
        const { id,name, type, seats, price, image, description } = req.body;

        // Create new vehicle object
        const newVehicle = new Vehicle({
            id,
            name,
            type,
            seats,
            price,
            image,
            description
        });

        // Save to the database
        await newVehicle.save();

        res.status(201).json({
            message: "Vehicle created successfully",
            vehicle: newVehicle
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating vehicle",
            error: error.message
        });
    }
};


// Get all vehicles
export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching vehicles",
            error: error.message
        });
    }
};

// Get vehicle by ID
export const getVehicleById = async (req, res) => {
    const { id } = req.params;

    try {
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching vehicle",
            error: error.message
        });
    }
};

// Update vehicle information
export const updateVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedVehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            message: "Vehicle updated successfully",
            vehicle: updatedVehicle
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating vehicle",
            error: error.message
        });
    }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(id);

        if (!deletedVehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            message: "Vehicle deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting vehicle",
            error: error.message
        });
    }
};

// Mark vehicle as booked
export const bookVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        const vehicle = await Vehicle.findById(id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        // Update vehicle's booked status
        vehicle.booked = true;
        await vehicle.save();

        res.status(200).json({
            message: "Vehicle booked successfully",
            vehicle
        });
    } catch (error) {
        res.status(500).json({
            message: "Error booking vehicle",
            error: error.message
        });
    }
};

// Mark vehicle as available
export const unbookVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        const vehicle = await Vehicle.findById(id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        // Update vehicle's booked status
        vehicle.booked = false;
        await vehicle.save();

        res.status(200).json({
            message: "Vehicle is now available",
            vehicle
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating vehicle availability",
            error: error.message
        });
    }
};
