import mongoose from 'mongoose';


const favoriteSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mediaID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: true
    }]
}, { collection: 'favorites' });

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
