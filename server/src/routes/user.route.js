import express from 'express';
import { body } from 'express-validator';

import tokenMiddleware from '../middlewares/token.middleware.js';
import requestHandler from '../handlers/request.handler.js';
import userController from '../controllers/user.controller.js';
import User from '../models/user.model.js';


const router = express.Router();

router.post(
    '/auth/register',
    body('fullName')
        .exists().withMessage('full name is required')
        .isLength({ min: 3 }).withMessage('full name minimum 3 characters'),
    body('username')
        .exists().withMessage('username is required')
        .isLength({ min: 8 }).withMessage('username minimum 8 characters')
        .custom(async value => {
            const user = await User.findOne({ username: value });
            if (user) {
                return Promise.reject('username already used');
            }
        }),
    body('password')
        .exists().withMessage('password is required')
        .isLength({ min: 8 }).withMessage('password minimum 8 characters'),
    requestHandler.validate,
    userController.registerUser
);

router.post(
    '/auth/login',
    body('username')
        .exists().withMessage('username is required')
        .isLength({ min: 8 }).withMessage('username minimum 8 characters'),
    body('password')
        .exists().withMessage('password is required')
        .isLength({ min: 8 }).withMessage('password minimum 8 characters'),
    requestHandler.validate,
    userController.loginUser
);

router.get('/stored', tokenMiddleware.auth, userController.stored);

router.put('/add-info', tokenMiddleware.auth, userController.updateInfo);

router.get('/info', tokenMiddleware.auth, userController.getInfo);

export default router;
