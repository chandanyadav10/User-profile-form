import mongoose from "mongoose";

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stateId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'State', required: true 
    },
    pincode: {
        type: String,
        required: true
    }
})

const City = mongoose.model('City', citySchema);
export default City