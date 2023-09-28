const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const mongoose = require('mongoose');
const {mongoURL} = require('./keys');

app.use(cors());
require('./models/model');
require('./models/post');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/createPost'));

mongoose.connect(mongoURL);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));