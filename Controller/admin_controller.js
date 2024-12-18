import Admin from "../Model/admin_model.js"; // Adjust the path to your admin model

// Store data
export const storeData = async (req, res) => {
    try {
        const { vehicleId, vehicleName, pickupDate, pickupTime, returnDate, returnTime, paymentMethod } = req.body;
        if (!vehicleId || !vehicleName || !pickupDate || !pickupTime || !returnDate || !returnTime || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const adminData = new Admin({
            vehicleId,
            vehicleName,
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
            paymentMethod,
        });

        // Save data to the database
        const savedData = await adminData.save();
        res.status(201).json({ message: "Booking confirmed", data: savedData });
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all data
export const getData = async (req, res) => {
    try {
        // Retrieve all admin data
        const data = await Admin.find();
        
        // Check if data exists
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        // Return all data
        res.status(200).json({ message: "Data retrieved successfully", data });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error: error.message });
    }
};

// Delete data
export const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the specific data by ID
        const deletedData = await Admin.findByIdAndDelete(id);

        // If no data is found, return a 404 response
        if (!deletedData) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Return success message with the deleted data
        res.status(200).json({ message: "Data deleted successfully", data: deletedData });
    } catch (error) {
        res.status(500).json({ message: "Error deleting data", error: error.message });
    }
};
