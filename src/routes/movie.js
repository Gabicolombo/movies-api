const express = require('express');
const multer = require('multer');

const controller = require('../controllers/movie');

const routes = express.Router();
const upload = multer();

const baseUrl = '/movie';

routes.post(`${baseUrl}`, upload.single('image'), controller.registerMovie);

module.exports = routes;