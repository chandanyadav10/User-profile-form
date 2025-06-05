import mongoose from "mongoose";

const stateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    countryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Country', required: true 
    }
})

const State = mongoose.model('State', stateSchema);
export default State