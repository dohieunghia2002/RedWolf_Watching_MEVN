import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import mongoose from 'mongoose';
// mongoose.set('debug', true)
import User from '../models/user.model.js';
import responseHandler from '../handlers/response.handler.js';

// Register user, route POST /users/auth/register
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

// Login user, route POST /users/auth/login
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

// Soft delete user, route DELETE /users/:id
const softDel = async (req, res) => {
    try {
        const resDel = await User.delete(
            { _id: req.params.id }
        );
        if (resDel) {
            responseHandler.ok(res, resDel);
        }
        else {
            responseHandler.notFound(res);
        }
    } catch {
        responseHandler.error(res);
    }
}

// List deleted user, route GET /users/trash
const deletedUsers = async (req, res) => {
    try {
        const resDel = await User.findDeleted();
        if (resDel) {
            responseHandler.ok(res, resDel);
        }
        else {
            responseHandler.notFound(res);
        }
    } catch {
        responseHandler.error(res);
    }
}

// Real delete user, route DELETE /users/:id/force
const forceDelete = async (req, res) => {
    try {
        const resDel = await User.deleteOne({ _id: req.params.id });
        if (resDel) {
            responseHandler.ok(res, resDel);
        }
        else {
            responseHandler.notFound(res);
        }
    } catch {
        responseHandler.error(res);
    }
}

// Restore user, route PUT /users/restore
const restoreUser = async (req, res) => {
    try {
        const { id } = await req.body;
        const restore = await User.restore({ _id: id });
        const user = await User.findById(id);
        await user.save();
        if (restore) {
            responseHandler.ok(res, restore);
        }
        else {
            responseHandler.notFound(res);
        }
    } catch {
        responseHandler.error(res);
    }
}

// Change user password, route PUT /users/password
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

// List all user, GET /users/stored
const stored = async (req, res) => {
    try {
        var users = await User.find({});
        users = users.map(({ password, ...rest }) => {
            const item = rest._doc;
            item.password = undefined;
            return item;
        })
        responseHandler.ok(res, users);
    } catch {
        responseHandler.error(res);
    }
}

// Get info user, route GET /users/info
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
    registerUser, loginUser, stored, changePassword, getInfo, updateInfo, softDel, deletedUsers, restoreUser, forceDelete
};
