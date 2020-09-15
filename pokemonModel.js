// pokemonModel.js
var mongoose = require('mongoose');

delete mongoose.connection.models['pokemon'];
// Setup schema
var pokemonSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});
// Export Pokemon model
var Pokemon = module.exports = mongoose.model('pokemon', pokemonSchema);
module.exports.get = function (callback, limit) {
    Pokemon.find(callback).limit(limit);
}