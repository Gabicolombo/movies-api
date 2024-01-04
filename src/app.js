const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve("./env/config.env") });

const db = require('../db/connection');
const MovieRoutes = require('./routes/movie');
const GenreRoutes = require('./routes/genre');

// connecting
const app = express();

app.use(cors());
app.use(express.json());
app.use(body_parser.json());

app.use(MovieRoutes);
app.use(GenreRoutes);

db();

app.listen(2828, () => {
  console.info('Server is up');
})