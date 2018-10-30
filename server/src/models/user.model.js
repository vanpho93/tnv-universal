const mongoose = require('mongoose');
const faker = require('faker');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true, default: faker.image.avatar },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
