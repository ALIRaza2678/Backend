import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    booked: {
        type: Boolean,
        default: false,  // By default, the vehicle is not booked
    }
});

// Adding custom 'id' field for better readability
vehicleSchema.virtual('id').get(function() {
    return this._id.toHexString(); // Alias the _id field as 'id'
});

// Ensure virtuals are included in the JSON output
vehicleSchema.set('toJSON', {
    virtuals: true,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
