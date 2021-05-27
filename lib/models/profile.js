'use strict';

const mongoose = require('mongoose');
const pokemon = require('./pokemon.js');

const ProfileSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  pokedex: [pokemon.schema],
});

module.exports = {
  schema: ProfileSchema,
  model: mongoose.model('Profile', ProfileSechema),
}
