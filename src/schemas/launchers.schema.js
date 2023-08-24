import Mongoose from 'mongoose';
import mongoose from "mongoose";


const SpaceSchema  = new mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: Date
    },
    rocket: {
        type: String
    },
    webcast: {
        type: String
    },
    success: {
        type: Boolean
    },
    flight_number: {
        type: BigInt
    },

    logo: {
        type: String
    },

    cores: [
        {
            core: String,
            flight: Number,
            gridfins: Boolean,
            legs: Boolean,
            reused: Boolean,
            landing_attempt: Boolean,
            landing_success: Boolean,
            landing_type: String,
            landpad: String
        }
    ]
})

const spaceSchema = Mongoose.model('spacex', SpaceSchema)

export default spaceSchema;