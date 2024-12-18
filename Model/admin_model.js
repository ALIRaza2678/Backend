import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
    },
    vehicleName: {
        type: String,
        required: true,
    },
    pickupDate: {
        type: String,
        required: true,
    },
    pickupTime: {
        type: String,
        required: true,
    },
    returnDate: {
        type: String,
        required: true,
    },
    returnTime: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
