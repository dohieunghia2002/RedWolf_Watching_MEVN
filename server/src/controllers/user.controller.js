import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import mongoose from 'mongoose';
// mongoose.set('debug', true)
import User from '../models/user.model.js';
import responseHandler from '../handlers/response.handler.js';

// Register user, route POST /users/auth/register , access public
const registerUser = async (req, res) => {
    const { fullName, username, password } = req.body;
    try {
        const userExist = await User.findOne({ username });

        if (userExist) {
            return responseHandler.badRequest(res, 'Username already exist');
        }

        const hash = await bcrypt.hash(password, 10);

        // // Create user in DB
        const user = await User.create({ fullName, username, password: hash });

        const token = jwt.sign(
            { data: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        responseHandler.created(res, {
            token,
            ...user._doc
        })
    } catch {
        responseHandler.error(res);
    }
}

// Login user, route POST /users/auth/login , access public
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return responseHandler.notFound(res, 'User not exist');
        }

        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            return responseHandler.badRequest(res, 'Wrong password');
        }

        const token = jwt.sign(
            { data: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        user.password = undefined;

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user._id
        })
    } catch {
        responseHandler.error(res);
    }
}

const updateInfo = async (req, res) => {
    const addedData = req.body;
    const id = req.user._id;
    try {
        const user = await User.findOne(id);
        if (!user) {
            return responseHandler.notFound(res, 'User not exist');
        }

        user.email = addedData.email || user.email;
        user.phone = addedData.phone || user.phone;
        user.socialNetLink = addedData.socialNetLink || user.socialNetLink;
        user.profession = addedData.profession || user.profession;
        user.placeBirth = addedData.placeBirth || user.placeBirth;
        user.image = addedData.image || user.image;

        await user.save();
        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
}

// Change user password, route PUT /users/password , access private
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return responseHandler.unauthorize(res);
        }

        if (!bcrypt.compare(oldPassword, user.password)) {
            return responseHandler.badRequest(res, 'Wrong password');
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
}

// Get info user, route GET /users/info , access private
const getInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return responseHandler.notFound(res);
        }

        user.password = undefined;
        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
}

export default {
    registerUser, loginUser, changePassword, getInfo, updateInfo
};
