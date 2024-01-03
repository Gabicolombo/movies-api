const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

const db = require('../db/connection');

// connecting
const app = express();

app.use(cors);
app.use(express.json());
app.use(body_parser.json());

db();

app.listen(2828, () => {
  console.info('Server is up');
})