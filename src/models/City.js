import mongoose, { Schema } from 'mongoose';

const CitySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required?']
    },
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: Date
});

export default mongoose.model('City', CitySchema);
