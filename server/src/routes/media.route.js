import express from 'express';

import mediaController from '../controllers/media.controller.js';

import tokenMiddleware from '../middlewares/token.middleware.js';


const router = express.Router();

router.post('/add', tokenMiddleware.auth, mediaController.addMedia);

router.get('/movies/intro', mediaController.getRandMovie);

router.get('/rand', mediaController.randomMedia);

router.get('/movies/popular', mediaController.popularMovies);

router.get('/movies/rated', mediaController.topRatedMovies);

router.get('/tv-series/popular', mediaController.popularTVSeries);

router.get('/tv-series/rated', mediaController.topRatedSeries);

router.get('/tv-series/intro', mediaController.getRandSeries);

router.get('/detail/:id', mediaController.show);

router.get('/', mediaController.storeMedia);


export default router;
