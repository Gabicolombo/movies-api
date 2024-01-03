const express = require('express');
const controller = require('../controllers/genre');

const routes = express.Router();

const baseUrl = '/genre';

routes.post(`${baseUrl}`, controller);

module.exports = routes;