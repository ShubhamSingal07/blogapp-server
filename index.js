const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

require('./models/user');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/blogApp';

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || CLIENT_URL.indexOf(origin) !== -1) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/', require('./routes'));

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('connected to database');
    app
      .listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`);
      })
      .on('error', console.log);
  })
  .catch(err => {
    console.log('could not connect to database');
  });
