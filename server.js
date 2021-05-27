'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Use these to validate your token
const jwt = require('jsonwebtoken');
const getKey = require('./lib/auth/getKey.js');

// Use these to perform CRUD for a given Data Model
const ProfileModel = require('./lib/models/profile.js').model;
const PokemonModel = require('./lib/models/pokemon.js').model;

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
  //    respond with a 401 if no user is found.
  // create a new Pokemon and add it to the Profile's pokedex
  // respond with the updated Pokedex object.
});

app.delete('/pokedex/:id', (request, response) => {
  // TODO: Remove a Pokemon from the Users Profile Pokedex.

  // Check for the presence of a token onthe request.
  // validate the token
  // find A profile associated with the Token
  //    respond with a 401 if no user is found
  // remove the pokemon from the Profile
  // response with the updated Pokedec object.
});

const db = mongoose.connection;
db.on('error', () => console.log('DB error occured'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log('Pokedex server awaiting requests ::: ' + PORT);
  });
});
