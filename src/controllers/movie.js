const cos = require('ibm-cos-sdk');
const mongoose = require('mongoose');
const { eventEmitter } = require('../appEventEmitter');

const Movie = require('../models/movie');
const Genre = require('../models/genre');

// Configurações do cliente COS
const cosConfig = {
  endpoint: process.env.endpoint,
  apiKeyId: process.env.apikeyid,
  serviceInstanceId: process.env.serviceinstanceid,

};

const cosClient = new cos.S3(cosConfig);

const getAllMovies = async (req, res, next) => {
  try{

    const movies = await Movie.aggregate([
      {
        $project: {
          _id: 0,
          __v: 0
        }
      }
    ]).allowDiskUse(true);

    if(movies.length == 0) return res.status(200).json({message: 'No movies found'});

    return res.status(200).json(movies);

  }catch(err){
    console.error(err);
  }
};

const getMovie = async (req, res, next) => {
  try{

    const movie = await Movie.findOne({id: req.params.id});
  
    if(movie == null) return res.status(404).json({message: 'No movie found'});

    eventEmitter.emit('getMovie', movie);

    return res.status(200).json(movie);

  }catch(err){
    console.error(err);
  }
};

const registerMovie = async (req, res, next) => {
  try {

    const len = await Movie.find({});

    const bucketName = "api-movies";
    const key = req.file.originalname;

    if(await Movie.findOne({nameImage: key})) return res.status(400).json({message: 'Update the image'});

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: req.file.buffer, // Dados da imagem em formato de buffer
      ContentType: req.file.mimetype,
    };

    // Realizar o upload para o bucket
    const image = await cosClient.upload(params).promise();

    const newMovie = new Movie({
      id: len.length + 1,
      ...req.body,
      image: image.Location,
      nameImage: key,
    });
   
    const savedMovie = await newMovie.save();
    console.log('New movie saved:', savedMovie);

    eventEmitter.emit('AddMovie', 'Successfully Added');

    return res.status(200).json({ message: 'Successfully added' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `${err}` });
  }
}

const updateMovie = async (req, res, next) => {
  try{

    const movie = await Movie.findOne({id: req.params.id});

    if(movie == null) return res.status(404).json({ message: 'Movie not found' });

    await Movie.updateOne({id: req.params.id}, { $set: req.body});

    eventEmitter.emit('updateMovie', 'Movie updated successfully');

    return res.status(200).json({ message: 'Movie updated successfully' });

  }catch(err){
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteMovie = async (req, res, next) => {
  try{

    const movie = await Movie.findOne({id: req.params.id});
  
    if(movie == null) return res.status(404).json({ message: 'Movie not found' });

    const bucketName = "api-movies";
    const key = movie.nameImage;

    const params = {
      Bucket: bucketName,
      Key: key,
    };

    cosClient.deleteObject(params).promise();

    await Movie.deleteOne({id: req.params.id});

    eventEmitter.emit('deleteMovie', 'Movie deleted successfully');

    return res.status(200).json({ message: 'Movie deleted successfully' });

  }catch(err){
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  registerMovie,
  updateMovie,
  deleteMovie
}