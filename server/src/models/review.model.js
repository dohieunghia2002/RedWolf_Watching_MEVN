import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mediaID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: true
    },
    content: { type: String },
    date: {
        type: Date,
        default: Date.now
    },
    rate: {
        type: Number,
        default: 0
    }
}, { collection: 'reviews' });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
