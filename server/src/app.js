const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const { userRouter } = require('./routers/user.router');

const app = express();
app.use(cors());
app.use(json());
app.use((req, res, next) => setTimeout(next, 500));

app.use((req, res, next) => {
    res.onError = error => {
        if (!error.status) console.log(error);
        const body = { success: false, message: error.message };
        res.status(error.status || 500).send(body);
    }
    next();
});

app.use('/user', userRouter);

module.exports = { app };
