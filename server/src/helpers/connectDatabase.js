const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/tnv-local', { useMongoClient: true })
.then(() => console.log('Database connected'))
.catch(error => {
    console.log('Cannot connect database', error);
    process.exit(1);
});
