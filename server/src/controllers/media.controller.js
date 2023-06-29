import Media from '../models/media.model.js';
import responseHandler from '../handlers/response.handler.js';

// Add media, route /media/add
const addMedia = async (req, res) => {
    try {
        const {
            userID, name, description, posters,
            category, genre, language, year,
            eppisodes, rate, numberRater, casts
        } = req.body;

        const media = new Media({
            userID, name, description, posters,
            category, genre, language, year,
            eppisodes, rate, numberRater, casts,
        });

        if (media) {
            const createdMedia = await media.save();
            responseHandler.created(res, createdMedia);
        }
        else {
            responseHandler.badRequest(res, 'Invalid media data');
        }
    } catch {
        responseHandler.error(res);
    }
};

// update info media, route PUT /media/update
const updateMedia = async (req, res) => {
    try {
        const media = await Media.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });
        responseHandler.ok(res, media);
    } catch {
        responseHandler.error(res);
    }
}


// All media, route /media , access public
const storeMedia = async (req, res) => {
    try {
        const listMedia = await Media.find({});
        responseHandler.ok(res, listMedia);
    } catch {
        responseHandler.error(res)
    }
};


// All movie popular, route GET /media/movies/popular
const popularMovies = async (req, res) => {
    try {
        const movies = await Media.find({ category: 'movie' }).sort({ numberRater: 'desc' })
        responseHandler.ok(res, movies);
    } catch {
        responseHandler.error(res);
    }
}

// All movie top rated, route GET /media/movies/rated
const topRatedMovies = async (req, res) => {
    try {
        const movies = await Media.find({ category: 'movie' }).sort({ rate: 'desc' })
        responseHandler.ok(res, movies);
    } catch {
        responseHandler.error(res);
    }
}

// All tv series popular, route GET /media/tv-series/popular
const popularTVSeries = async (req, res) => {
    try {
        const films = await Media.find({ category: 'tv series' }).sort({ numberRater: 'desc' });
        responseHandler.ok(res, films);
    } catch {
        responseHandler.error(res);
    }
}

// All movie top rated, route GET /media/movies/rated
const topRatedSeries = async (req, res) => {
    try {
        const series = await Media.find({ category: 'tv series' }).sort({ rate: 'desc' })
        responseHandler.ok(res, series);
    } catch {
        responseHandler.error(res);
    }
}

// Get random a media, route GET /media/rand
const randomMedia = async (req, res) => {
    try {
        const tempMovies = (await Media.find({}));

        const quantity = tempMovies.length;
        var random = Math.floor(Math.random() * quantity);

        const film = tempMovies[random];

        responseHandler.ok(res, film);
    } catch {
        responseHandler.error(res);
    }
}

// Get random a movie, route GET /media/movies/intro
const getRandMovie = async (req, res) => {
    try {
        const tempMovies = (await Media.find({ category: 'movie' }));

        const quantity = tempMovies.length;
        var random = Math.floor(Math.random() * quantity);

        const movie = tempMovies[random];

        responseHandler.ok(res, movie);
    } catch {
        responseHandler.error(res);
    }
}

// Get random a tv series, route GET /media/tv-series/intro
const getRandSeries = async (req, res) => {
    try {
        const tempSeries = (await Media.find({ category: 'tv series' }));

        const quantity = tempSeries.length;
        var random = Math.floor(Math.random() * quantity);

        const series = tempSeries[random];

        responseHandler.ok(res, series);
    } catch {
        responseHandler.error(res);
    }
}

// Info detail of a media base on id, GET /media/:id/detail
const show = async (req, res) => {
    try {
        const result = await Media.findOne({ _id: req.params.id })

        if (result) {
            responseHandler.ok(res, result);
        }
        else {
            responseHandler.notFound(res);
        }
    } catch {
        responseHandler.error(res);
    }
}

export default {
    addMedia,
    updateMedia,
    storeMedia,
    randomMedia,
    popularMovies,
    topRatedMovies,
    popularTVSeries,
    topRatedSeries,
    getRandMovie,
    getRandSeries,
    show
};
