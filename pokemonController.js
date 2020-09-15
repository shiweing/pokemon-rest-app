// pokemonController.js
// Import pokemon model
Pokemon = require('./pokemonModel');
// Handle index actions
exports.index = function (req, res) {
    Pokemon.get(function (err, pokemons) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Pokemons retrieved successfully",
            data: pokemons
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var pokemon = new Pokemon();
    pokemon._id = req.body.id
    pokemon.name = req.body.name ? req.body.name : pokemon.name;
    // save pokemon and check for errors
    pokemon.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New pokemon added!',
            data: pokemon
        });
    });
};
// Handle view pokemon info
exports.view = function (req, res) {
    Pokemon.findById(req.params.id, function (err, pokemon) {
        if (err)
            res.send(err);
        res.json({
            message: 'Pokemon details loading..',
            data: pokemon
        });
    });
};
// Handle update pokemon info
exports.update = function (req, res) {
    Pokemon.findById(req.params.id, function (err, pokemon) {
        if (err)
            res.send(err);
        pokemon.name = req.body.name ? req.body.name : pokemon.name;
        // save the pokemon and check for errors
        pokemon.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Pokemon Info updated',
                data: pokemon
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Pokemon.remove({
        _id: req.params.id
    }, function (err, pokemon) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Pokemon deleted'
        });
    });
};