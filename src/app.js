const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { eventEmitter } = require('./appEventEmitter');

dotenv.config({ path: path.resolve("./env/config.env") });

const {connectDB} = require('../db/connection');
const MovieRoutes = require('./routes/movie');
const GenreRoutes = require('./routes/genre');

// connecting
const app = express();

app.use(cors());
app.use(express.json());
app.use(body_parser.json());

app.use(MovieRoutes);
app.use(GenreRoutes);

connectDB();

// listen the event emitter
eventEmitter.on('getMovie', (data) => {
  console.log('getMovie event: ', data);
})

eventEmitter.on('AddMovie', (data) => {
  console.log('AddMovie event: ', data);
});

eventEmitter.on('updateMovie', (data) => {
  console.log('updateMovie event: ', data);
});

eventEmitter.on('deleteMovie', (data) => {
  console.log('deleteMovie event: ', data);
});

const server = app.listen(process.env.port, () => {
  console.info('Server is up');
});

module.exports = { app, server };