import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    language: { type: String, required: true },
    bio: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
