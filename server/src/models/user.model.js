import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    placeBirth: { type: String },
    image: { type: String },
    profession: { type: String },
    isAdmin: { type: Boolean, default: false }
}, { collection: 'user' })

const User = mongoose.model('User', userSchema);
export default User;