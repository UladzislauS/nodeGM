import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required?']
    },
    reviews: {
        type: Number,
        min: [0, `Reviews can't be less than 0?`]
    },
    lastModifiedDate: Date
});

export default mongoose.model('Product', ProductSchema);
