const { hash, compare } = require('bcrypt');
const faker = require('faker');
const { ServerError, exist } = require('../models/server-error.model');
const { sign, verify } = require('../helpers/jwt');
const { User } = require('../models/user.model');

class UserService {
    static async signUp(name, email, password) {
        exist(password, 'EMPTY_PASSWORD', 400);
        exist(name, 'EMPTY_NAME', 400);
        exist(email, 'EMPTY_EMAIL', 400);
        try {
            const encrypted = await hash(password, 8);
            const user = new User({ name, email, password: encrypted });
            await user.save();
            user.password = undefined;
            return user;
        } catch (error) {
            throw new ServerError('EMAIL_EXISTED', 419);
        }
    }

    static async signIn(email, password) {
        exist(password, 'EMPTY_PASSWORD', 400);
        exist(email, 'EMPTY_EMAIL', 400);
        const user = await User.findOne({ email });
        exist(user, 'CANNOT_FIND_USER', 404)
        const same = await compare(password, user.password);
        exist(same, 'CANNOT_FIND_USER', 404)
        const token = await sign({ _id: user._id });
        const userInfo = user.toObject();
        userInfo.token = token;
        delete userInfo.password;
        return userInfo;
    }

    static async checkToken(token) {
        const { _id } = await verify(token)
        .catch(() => {
            throw new ServerError('INVALID_TOKEN', 400);
        });
        const user = await User.findById(_id).select('_id name email avatar');
        exist(user, 'CANNOT_FIND_USER', 404)
        const newToken = await sign({ _id: user._id });
        const userInfo = user.toObject();
        userInfo.token = newToken;
        return userInfo;
    }
}

module.exports = { UserService };
