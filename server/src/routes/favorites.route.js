import express from 'express';

import favoriteController from '../controllers/favorite.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import requestHandler from '../handlers/request.handler.js';


const router = express.Router();

router.post('/add',
    tokenMiddleware.auth,
    requestHandler.validate,
    favoriteController.addFavorite
);

router.post('/detail-medias', tokenMiddleware.auth, favoriteController.details);

router.delete('/:id', tokenMiddleware.auth, favoriteController.removeFavorite);

router.get('/user', tokenMiddleware.auth, favoriteController.favoritesAllUser);

router.get('/', tokenMiddleware.auth, favoriteController.getFavoritesOfUser);

export default router;
