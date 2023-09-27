const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const mongoose = require('mongoose');
const mongoUrl = require('./keys');

app.use(cors());
require('./models/model');
app.use(express.json());
app.use(require('./routes/auth'));

mongoose.connect(mongoUrl);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));