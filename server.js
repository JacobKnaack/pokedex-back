'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Use these to validate your token
const jwt = require('jsonwebtoken');
const getKey = require('./lib/auth/getKey.js');

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pokedex';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/profile', (request, response) => {
  //TODO: allow the user to retrieve their profile information

  // Check for the presence of a token on the request.
  // validate the token using jwt and the getKey function
  // Search for a Profile in the DB using user information from the token
  //    create a new Profile is none is found.
  //  send the Profile back to the user in the response.

});

app.post('/pokedex', (request, response) => {
  // TODO: Add a new pokemon to a User Profile's pokedex.

  // check for the presence of a token on the request
  // validate the token using jwt and the getKey function
  // find the User profile associated with the token
  //     respond with a 401 is no user is found.
  // create a new Pokemon and add it to the Profile's pokedex
  // respond with the updated Pokedex object.
});

const db = mongoose.connection;
db.on('error', () => console.log('DB error occured'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log('Pokedex server awaiting requests ::: ' + PORT);
  });
});
