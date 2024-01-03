const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
});

GenreSchema.virtual('movie', {
  ref: 'Movie',
  localField: 'genre',
  foreignField: 'name'
});

const Genre = mongoose.model('Genre', GenreSchema);
module.exports = Genre;