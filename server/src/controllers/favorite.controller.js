import Favorite from '../models/favorite.model.js';
import Media from '../models/media.model.js';
import responseHandler from '../handlers/response.handler.js';

// Add favorite, route POST /favorites/add
const addFavorite = async (req, res) => {
    try {
        const mediaId = await req.body.mediaID;

        // Check user has favorites list?
        const isUserFavorited = await Favorite.findOne({
            userID: req.user._id,
        });

        // case: user has favorites list, push new media to favorites list
        if (isUserFavorited) {
            // case: media favorited for user
            const isFavorite = await Favorite.findOne({
                userID: req.user._id,
                mediaID: req.body.mediaID
            });

            if (isFavorite) {
                return responseHandler.ok(res, isFavorite);
            }
            const add = await Favorite.findOneAndUpdate(
                { userID: req.user._id },
                { $push: { mediaID: mediaId } },
                { new: true }
            );

            return responseHandler.created(res, add);
        }
        else {
            const favorite = new Favorite({ mediaID: mediaId, userID: req.user._id });
            await favorite.save();
            return responseHandler.created(res, favorite);
        }
    } catch {
        responseHandler.error(res);
    }
}

// Remove favorite, route DELETE /favorites/:id
const removeFavorite = async (req, res) => {
    try {
        const favoriteID = await req.params.id;
        var favorites = await Favorite.findOne({ userID: req.user._id });
        if (!favorites) {
            return responseHandler.notFound(res);
        }

        const isItem = favorites.mediaID.includes(favoriteID);
        if (isItem) {
            favorites.mediaID = favorites.mediaID.filter(function (item) {
                return item != favoriteID
            })
            favorites.save();
            return responseHandler.ok(res, favorites);
        }
        else {
            return responseHandler.notFound(res);
        }
    } catch {
        responseHandler.error(res);
    }
}

// Get favorites of user, route GET /favorites
const getFavoritesOfUser = async (req, res) => {
    try {
        const favorite = await Favorite.findOne({ userID: req.user._id })
        responseHandler.ok(res, favorite);
    } catch {
        responseHandler.error(res);
    }
}

// Admin get favorites of user, route GET /favorites/:id
const adminTrackFavoritesUser = async (req, res) => {
    try {
        const favorite = await Favorite.findOne({ userID: req.params.id })
        responseHandler.ok(res, favorite);
    } catch {
        responseHandler.error(res);
    }
}

// Admin get favorites all user, route GET /favorites/user
const favoritesAllUser = async (req, res) => {
    try {
        const favorite = await Favorite.find({});
        responseHandler.ok(res, favorite);
    } catch {
        responseHandler.error(res);
    }
}

const details = async (req, res) => {
    try {
        const mediaID = await req.body.mediaID;

        var list = [];
        for (let index = 0; index < mediaID.length; index++) {
            const element = await Media.findById(mediaID[index]);
            list.push(element);
        }
        responseHandler.ok(res, list);
    } catch {
        responseHandler.error(res);
    }
}


export default {
    addFavorite, removeFavorite, getFavoritesOfUser, details, favoritesAllUser, adminTrackFavoritesUser
};
