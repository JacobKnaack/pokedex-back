'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Use these to validate your token
const jwt = require('jsonwebtoken');
const getKey = require('./lib/auth/getKey.js');

function verifyToken(token, callback) {
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      console.error('Something went wrong');
      return callback(err);
    }
    callback(user);
  })
}

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
  const token = request.headers.authorization.split(' ')[1];
  verifyToken(token, findPokemon);

  async function findPokemon(user) {
    const username = user.name;
    await ProfileModel.find({ username }, (err, person) => {
      if (err) console.log(err);
      if (!person.length) {
        person[0] = { username, pokedex: [] };
        const newPokedex = new ProfileModel(person[0]);
        newPokedex.save();
      }
      response.send(person[0]);
    });
  }
});

app.post('/pokedex', (request, response) => {
  const token = request.headers.authorization.split(' ')[1];
  const newPokemon = new PokemonModel(request.body);
  verifyToken(token, addPokemon);

  async function addPokemon(user) {
    console.log(user);
    const username = user.name;
    await ProfileModel.find({ username }, (err, profile) => {
      if (err) console.log(err);
      if (profile.length) {
        profile[0].pokedex.push(newPokemon);
        newPokemon.save();
        profile[0].save();
        response.send(profile[0].pokedex);
      } else {
        response.status(401).send('no profile found');
      }
    });
  }
});

app.put('/pokedex/:id', (request, response) => {
  const token = request.headers.authorization.split(' ')[1];
  const newPokemon = request.body;
  const pokemonId = parseInt(request.params.id);
  verifyToken(token, updatePokemon);

  async function updatePokemon(user) {
    const username = user.name;
    await ProfileModel.find({ username }, (err, profile) => {
      if (err) console.log(err);
      if (!profile.length) {
        response.status(401).send('No Profile found for ', username);
      } else {
        profile[0].pokedex = profile.pokedex.map((pokemon, i) => {
          if (i === pokemonId) return newPokemon;
          return pokemon;
        });
        profile[0].save();
        response.send(profile[0].pokedex);
      }
    })
  }
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
