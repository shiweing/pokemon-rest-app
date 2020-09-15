// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../src/index');
const Pokemon = require('../src/pokemon/pokemonModel');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("/api/pokemons", () => {
    // test Get api
    it("GET", () => {
        let poke = new Pokemon({ _id: 1, name: 'poke' });
        poke.save()
            .then(() => done());
        chai.request(app)
            .get('/api/pokemons')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.name.should.be.equal("poke");
                done();
            })
    })

    // Test POST api
    it("POST", () => {
        chai.request(app)
            .post("/api/pokemons")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                _id: 1,
                name: "poke"
            })
            .end((err, res) => {
                res.should.have.status(200);
                Pokemon.findById(1)
                    .then((pokemon) => {
                        pokemon.name.should.be.equal("poke");
                        done();
                    });
            })
    })
})