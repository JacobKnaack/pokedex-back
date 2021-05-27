'use strict';

const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  name: { type: String },
  image_url: { type: String },
  abilities: [String],
});

module.exports = {
  schema: PokemonSchema,
  model: mongoose.model('Pokemon', PokemonSchema),
}

