const cos = require('ibm-cos-sdk');
const mongoose = require('mongoose');

const Movie = require('../models/movie');
const Genre = require('../models/genre');

// Configurações do cliente COS
const cosConfig = {
  endpoint: process.env.endpoint,
  apiKeyId: process.env.apikeyid,
  serviceInstanceId: process.env.serviceinstanceid,

};

const cosClient = new cos.S3(cosConfig);

const getAllMovies = async (req, res, next) => { };

const getMovie = async (req, res, next) => { };

const registerMovie = async (req, res, next) => {
  try {

    const len = await Movie.find({});

    const bucketName = "api-movies";
    const key = req.file.originalname;

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
      image: image.Location
    });
   
    newMovie.save()
      .then(() => {
        return res.status(200).json({ message: 'Sucessfully added' });
      })
      .catch((error) => {
        return res.status(500).json({ message: `Error: ${error}` });
      });

  } catch (err) {
    console.error(err);
  }
}

const updateMovie = async (req, res, next) => { };

const deleteMovie = async (req, res, next) => { };

module.exports = {
  getAllMovies,
  getMovie,
  registerMovie,
  updateMovie,
  deleteMovie
}