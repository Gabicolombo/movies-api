const express = require('express');
const controller = require('../controllers/genre');

const routes = express.Router();

const baseUrl = '/genre';

routes.get(`${baseUrl}`, controller.getGenre);
routes.post(`${baseUrl}`, controller.registerGenre);

module.exports = routes;