const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: String, required: true },
  synopsis: { type: String, required: true },
  runtime: { type: String, required: true },
  image: { type: String, required: true, unique: true },
  nameImage: { type: String, required: true, unique: true },
});

MovieSchema.pre('save', async function(next){
  try {
    console.log(this);
    const genre = await mongoose.model('Genre').findOne({ name: this.genre });
    if (!genre) {
      throw new Error('Genre not found');
    }

    // Vincula o Genre ao Movie antes de salvar
    this.genre = genre.name;
    next();
  } catch (error) {
    next(error);
  }

})

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;