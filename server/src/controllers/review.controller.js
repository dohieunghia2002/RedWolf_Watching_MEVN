import responseHandler from '../handlers/response.handler.js';
import Review from '../models/review.model.js';
import User from '../models/user.model.js';
import Media from '../models/media.model.js';

// Create review, route POST /reviews/create
const create = async (req, res) => {
    try {
        const review = new Review({
            ...req.body
        });

        await review.save();
        const filter = { _id: review.mediaID };
        const media = await Media.findOne(filter);
        if (review.rate > 0) {
            media.numberRater++;
            media.rate = media.rate + review.rate;
        }
        await media.save();

        responseHandler.created(res, {
            ...review._doc,
            userID: req.user._id,
            userFullName: req.user.fullName,
            userImg: req.user.image
        });
    } catch {
        responseHandler.error(res);
    }
}

// Remove review, route DELETE /reviews/:id
const remove = async (req, res) => {
    try {
        const reviewID = await req.params.id;
        const review = await Review.findById(reviewID);
        const remove = await Review.deleteOne({ _id: reviewID })
        if (!remove) {
            return responseHandler.notFound(res);
        }
        const media = await Media.findById(review.mediaID);
        if (review.rate > 0) {
            media.numberRater = media.numberRater - 1;
            media.rate = media.rate - review.rate;
        }
        await media.save()
        responseHandler.ok(res, media);
    } catch {
        responseHandler.error(res);
    }
}

// Get reviews of user, route GET /reviews/user/:id
const getReviewsOfUser = async (req, res) => {
    try {
        const reviews = await Review.find({ userID: req.user._id });
        const result = [];
        for (let i = 0; i < reviews.length; i++) {
            const element = reviews[i];
            const infoMedia = await Media.findById(element.mediaID);
            result.push({
                ...element._doc,
                nameMedia: infoMedia.name,
                poster: infoMedia.posters[1],
            });
        }
        responseHandler.ok(res, result);
    } catch {
        responseHandler.error(res);
    }
}

//Get reviews of media, route GET /reviews/media/:id
const reviewsMedia = async (req, res) => {
    try {
        var reviewsTemp = await Review.find({ mediaID: req.params.id });
        var reviews = [];
        for (let index = 0; index < reviewsTemp.length; index++) {
            var element = reviewsTemp[index];
            var user = await User.findOne({ _id: element.userID });
            let sp = { ...element._doc, userFullName: user.fullName, userImg: user.image };
            reviews.push(sp);
        }
        return responseHandler.ok(res, reviews);
    } catch {
        responseHandler.error(res);
    }
}


export default {
    create, remove, getReviewsOfUser, reviewsMedia
};
