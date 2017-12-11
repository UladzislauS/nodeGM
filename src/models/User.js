import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required?'],
        lastModifiedDate: Date
    }
});

export default mongoose.model('User', UserSchema);
